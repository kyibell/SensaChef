from fastapi import APIRouter
from app.database import supabase
from pydantic import BaseModel
from datetime import datetime, timezone
router = APIRouter()
class userModel(BaseModel):
    name: str
    email: str
    username: str
    password: str
    creationDate: datetime
    
@router.get("/users", tags=["users"])
async def read_all_users():
    response = supabase.table("users").select("*").execute()
    return response.data

@router.get("/recipes", tags=["recipes"])
async def get_all_recipes():
    response = supabase.table("recipes").select("*").execute()
    return response.data

@router.post("/users", tags=["users"])
async def create_user(user: userModel):
    response = supabase.table("users").insert({"name": user.name, "email": user.email, "username": user.username, "password": user.password, "creationDate": (datetime.now(timezone.utc)).isoformat()}).execute()
    return response.data

@router.post("/users/recipes", tags=["users"])
async def user_recipes(user_id: str):
    response = supabase.table("recipes").select("*, steps(*)").eq("user_id", user_id).execute()
    return response.data

@router.put("/users/{user_id}", tags=["users"])
async def update_user(user_id: str, user: userModel):
    response = supabase.table("users").update({
        "name": user.name,
        "email": user.email
    }).eq("user_id", user_id).execute()
    return response.data

@router.delete("/users/{user_id}", tags=["users"])
async def delete_user(user_id: str):
    response = supabase.table("users").delete().eq("user_id", user_id).execute()
    return response.data
