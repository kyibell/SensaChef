from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

router = APIRouter()

class Prompt(BaseModel):
    prompt: str

@router.post("/api/ask")
async def ask_ai(prompt: Prompt):
    try:
        response = client.chat.completions.create(model="gpt-4",
        messages=[
            {"role": "user", "content": prompt.prompt}
        ],
        temperature=0.7,
        max_tokens=150)
        return {"response": response.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}
