from fastapi import FastAPI
from pydantic import BaseModel
from app.database import supabase
from app.routers import users
app = FastAPI()
app.include_router(users.router)