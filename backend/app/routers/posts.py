from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.database import supabase, admin_supabase
from pydantic import BaseModel
from typing import List 


router = APIRouter() # Define the Router for defining routes

class PostModel(BaseModel): # Model for Posts
    id: int
    created_at: datetime.datetime
    post_text: str
    post_image: str
    is_solved: bool
    post_tags: List[str]


