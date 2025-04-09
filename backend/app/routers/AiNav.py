from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
import os
import json

router = APIRouter()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class VoiceInput(BaseModel):
    text: str

@router.post("/api/AiNav/")
async def parse_intent(data: VoiceInput):
    prompt = (
    "You are a voice assistant for a cooking app. "
    "Interpret the user's message and return ONLY valid JSON. "
    "Format: {\"intent\": \"navigate\"|\"click\"|\"scroll\"|\"go_back\"|\"logout\", \"target\": \"value\"}. "
    "Examples:\n"
    "- 'Go to signup' → {\"intent\": \"navigate\", \"target\": \"signup\"}\n"
    "- 'Click start cooking' → {\"intent\": \"click\", \"target\": \"start-cooking-button\"}\n"
    "- 'Scroll down' → {\"intent\": \"scroll\", \"target\": \"down\"}\n"
    "- 'Go back' → {\"intent\": \"go_back\"}\n"
    f"User said: \"{data.text}\""
)



    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    content = response.choices[0].message.content.strip()
    print("OpenAI response:", content)

    try:
        return json.loads(content)
    except json.JSONDecodeError as e:
        print("JSON parse error:", e)
        return {"intent": "unknown"}
