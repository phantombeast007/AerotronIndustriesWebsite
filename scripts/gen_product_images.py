"""One-shot image generator for Aerotron product images (run manually)."""
import asyncio, base64, os, sys
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

API_KEY = os.getenv("EMERGENT_LLM_KEY") or "sk-emergent-a57A9843a406005AcF"
OUT_DIR = "/app/frontend/public/generated"
os.makedirs(OUT_DIR, exist_ok=True)

PROMPTS = [
    # Die-casting moulds — extra physical photos + 3D CAD render
    ("diecasting_mould_1.png",
     "Professional industrial product photograph of a large opened high-pressure aluminium die-casting mould on a workshop bench. "
     "Polished steel cavity and core halves with visible runners, gating, ejector pin pattern and cooling channel plugs. "
     "Hardened H13 tool steel with slight bluing near gates. Clean workshop background softly out of focus, "
     "overhead studio lighting, sharp detail, catalog/industrial photography, no text, no logos, no watermark."),
    ("diecasting_mould_2.png",
     "Close-up photograph of a multi-slide zinc die-casting mould assembly mounted on a tool-making bench, showing core pins, "
     "slide mechanisms, guide pillars and bushings, precision machined steel with polished cavity surfaces. "
     "Clean neutral grey workshop backdrop, professional industrial photography, crisp focus, no text, no watermark."),
    ("diecasting_mould_3d.png",
     "A clean 3D CAD rendering of an aluminium die-casting mould exploded assembly on a pure white background. "
     "Shows top half (cavity plate), bottom half (core plate), ejector plate with pins, guide pillars and bushings, "
     "cooling channels highlighted in blue, runner and gating system in translucent silver. Isometric engineering view, "
     "SolidWorks/Fusion-style photorealistic CAD render, soft shadows, high-resolution, no text, no dimension lines, no watermark."),
]


async def gen_one(filename: str, prompt: str):
    path = os.path.join(OUT_DIR, filename)
    if os.path.exists(path):
        print(f"SKIP (exists): {filename}")
        return
    chat = LlmChat(api_key=API_KEY, session_id=f"aerotron-img-{filename}",
                   system_message="You are an industrial product photographer.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    try:
        _text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
        if not images:
            print(f"FAIL (no image): {filename}")
            return
        img = images[0]
        data = base64.b64decode(img["data"])
        with open(path, "wb") as f:
            f.write(data)
        print(f"OK: {filename} ({len(data)} bytes)")
    except Exception as e:
        print(f"ERR: {filename} -> {e}")


async def main():
    for fname, prompt in PROMPTS:
        await gen_one(fname, prompt)


if __name__ == "__main__":
    asyncio.run(main())
