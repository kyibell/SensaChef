from fastapi import APIRouter
from app.database import supabase
from pydantic import BaseModel

router = APIRouter()
class userModel(BaseModel):
    name: str
    email: str
    
@router.get("/users", tags=["users"])
async def read_all_users():
    response = supabase.table("users").select("*").execute()
    return response.data

@router.post("/users", tags=["users"])
async def create_user(user: userModel):
    response = supabase.table("users").insert({"name": user.name, "email": user.email}).execute()
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
