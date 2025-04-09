import os
from fastapi import APIRouter
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

class CookingAIWrapper:
    def __init__(self, api_key: str = None, model: str = "gpt-4"):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        if not self.api_key:
            raise ValueError("API key must be provided or set in the OPENAI_API_KEY environment variable.")
            
        self.client = OpenAI(api_key=self.api_key)
        self.model = model
        self.base_prompt = (
            "You are a helpful assistant that specializes in cooking and food. "
            "Answer only questions about cooking and food. "
            "If the question is not related to cooking or food, respond with: "
            "'I can only answer questions about cooking and food.'"
        )

    def ask(self, user_prompt: str, temperature: float = 0.7, max_tokens: int = 150) -> str:
        final_prompt = f"{self.base_prompt}\n\nUser Query: {user_prompt}"
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[{"role": "user", "content": final_prompt}],
                temperature=temperature,
                max_tokens=max_tokens
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return f"Error: {str(e)}"

router = APIRouter()

class Prompt(BaseModel):
    prompt: str


cooking_ai = CookingAIWrapper(api_key=os.getenv("OPENAI_API_KEY"))


@router.post("/api/ask")
async def ask_ai(prompt: Prompt):
    result = cooking_ai.ask(prompt.prompt)
    return {"response": result}