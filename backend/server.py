from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend configuration
resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
CONTACT_RECIPIENT_EMAIL = os.environ.get('CONTACT_RECIPIENT_EMAIL')

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------- Models ----------
class ContactInquiryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(default=None, max_length=30)
    company: Optional[str] = Field(default=None, max_length=120)
    service: Optional[str] = Field(default=None, max_length=80)
    message: str = Field(min_length=1, max_length=5000)


class ContactInquiry(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    service: Optional[str] = None
    message: str
    email_sent: bool = False
    created_at: datetime


# ---------- Helpers ----------
def build_inquiry_html(data: ContactInquiryCreate) -> str:
    rows = [
        ("Name", data.name),
        ("Email", data.email),
        ("Phone", data.phone or "—"),
        ("Company", data.company or "—"),
        ("Service of Interest", data.service or "—"),
    ]
    row_html = "".join(
        f'<tr><td style="padding:10px 14px;background:#F8FAFC;border:1px solid #E2E8F0;'
        f'font-family:\'Courier New\',monospace;font-size:12px;color:#475569;'
        f'text-transform:uppercase;letter-spacing:1px;width:200px;">{label}</td>'
        f'<td style="padding:10px 14px;border:1px solid #E2E8F0;'
        f'font-family:Arial,sans-serif;font-size:14px;color:#020617;">{value}</td></tr>'
        for label, value in rows
    )
    return f"""
    <div style="background:#ffffff;padding:32px;font-family:Arial,sans-serif;">
      <div style="max-width:640px;margin:0 auto;border:1px solid #E2E8F0;">
        <div style="background:#1F8ACB;padding:24px 32px;color:#ffffff;">
          <p style="margin:0;font-family:'Courier New',monospace;font-size:11px;letter-spacing:2px;">// AEROTRON INDUSTRIES</p>
          <h1 style="margin:8px 0 0;font-size:22px;">New Contact Inquiry</h1>
        </div>
        <div style="padding:24px 32px;">
          <table style="width:100%;border-collapse:collapse;">
            {row_html}
          </table>
          <h3 style="margin:24px 0 8px;font-size:14px;font-family:'Courier New',monospace;letter-spacing:2px;color:#1F8ACB;">// MESSAGE</h3>
          <div style="padding:16px;background:#F8FAFC;border:1px solid #E2E8F0;font-size:14px;color:#020617;line-height:1.6;white-space:pre-wrap;">{data.message}</div>
          <p style="margin-top:24px;font-size:11px;color:#94A3B8;">Received {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}</p>
        </div>
      </div>
    </div>
    """


async def send_inquiry_email(data: ContactInquiryCreate) -> bool:
    if not resend.api_key or not CONTACT_RECIPIENT_EMAIL:
        logger.warning("Resend or recipient not configured; skipping email send.")
        return False
    params = {
        "from": f"Aerotron Website <{SENDER_EMAIL}>",
        "to": [CONTACT_RECIPIENT_EMAIL],
        "reply_to": data.email,
        "subject": f"New Inquiry — {data.name}" + (f" ({data.company})" if data.company else ""),
        "html": build_inquiry_html(data),
    }
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Resend email sent: {result.get('id')}")
        return True
    except Exception as e:
        logger.error(f"Resend send failed: {e}")
        return False


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Aerotron Industries API", "status": "ok"}


@api_router.get("/health")
async def health():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


@api_router.post("/contact", response_model=ContactInquiry)
async def create_contact_inquiry(payload: ContactInquiryCreate):
    inquiry_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc)

    email_sent = await send_inquiry_email(payload)

    doc = {
        "id": inquiry_id,
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "company": payload.company,
        "service": payload.service,
        "message": payload.message,
        "email_sent": email_sent,
        "created_at": created_at.isoformat(),
    }

    try:
        await db.contact_inquiries.insert_one(doc)
    except Exception as e:
        logger.error(f"Mongo insert failed: {e}")
        # we don't block response if email succeeded
        if not email_sent:
            raise HTTPException(status_code=500, detail="Unable to submit inquiry. Please try again.")

    return ContactInquiry(
        id=inquiry_id,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        company=payload.company,
        service=payload.service,
        message=payload.message,
        email_sent=email_sent,
        created_at=created_at,
    )


@api_router.get("/contact", response_model=List[ContactInquiry])
async def list_contact_inquiries(limit: int = 100):
    cursor = db.contact_inquiries.find({}, {"_id": 0}).sort("created_at", -1).limit(limit)
    items = await cursor.to_list(length=limit)
    results: List[ContactInquiry] = []
    for item in items:
        if isinstance(item.get("created_at"), str):
            item["created_at"] = datetime.fromisoformat(item["created_at"])
        results.append(ContactInquiry(**item))
    return results


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
