"""One-shot image generator for Aerotron product images (run manually)."""
import asyncio, base64, os, sys
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

API_KEY = os.getenv("EMERGENT_LLM_KEY") or "sk-emergent-a57A9843a406005AcF"
OUT_DIR = "/app/frontend/public/generated"
os.makedirs(OUT_DIR, exist_ok=True)

PROMPTS = [
    # Aerospace backshell connectors
    ("aerospace_backshell_1.png",
     "A professional studio product photograph of two aerospace MIL-DTL-38999 circular backshell connectors "
     "in anodized aluminium finish, machined threaded coupling rings, knurled texture, pin inserts visible. "
     "Pure white background, soft shadow, catalog/industrial product photography, sharp focus, high detail, no text, no watermark."),
    ("aerospace_backshell_2.png",
     "Close-up studio product photograph of an aerospace connector backshell assembly with heat-shrink strain relief, "
     "black anodized aluminium shell, triple-start threads, precision machined. Pure white background, "
     "catalog/industrial photography, sharp detail, no text, no logos, no watermark."),
    # PCB test jigs
    ("pcb_test_jig_1.png",
     "A professional photograph of an industrial bed-of-nails ICT in-circuit PCB test fixture. Transparent acrylic lid "
     "lifted open to reveal dense array of gold-tipped spring-loaded pogo pin probes over a green PCB. "
     "Aluminium frame base. Clean white studio background, industrial product photography, "
     "sharp focus, no text, no watermark."),
    ("pcb_test_jig_2.png",
     "A professional photograph of a closed PCB functional test jig (FCT) with pneumatic clamp, aluminium profile frame, "
     "green indicator LED, cable harness exiting the side, green PCB visible through acrylic window. "
     "White studio background, industrial catalog photography, sharp and clean, no text, no watermark."),
    # Conveyor plastic parts
    ("conveyor_plastic_1.png",
     "A professional studio product photograph of white injection-moulded plastic modular conveyor chain links "
     "and sprocket segments scattered on a pure white seamless background. Clean engineering plastic, "
     "subtle shadows, catalog photography, sharp focus, no text, no watermark."),
    ("conveyor_plastic_2.png",
     "A professional studio product photograph of black and blue injection-moulded plastic conveyor belt modules "
     "and pitch link chain parts arranged in a technical product grid on a pure white background. Industrial engineering "
     "polymer, matte finish, catalog photography, sharp focus, no text, no watermark."),
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
