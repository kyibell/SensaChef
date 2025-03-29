from fastapi import APIRouter
from app.database import supabase
from pydantic import BaseModel
from datetime import datetime, timezone
router = APIRouter()
class userModel(BaseModel):
    name: str
    username: str
    email: str
    password: str

class SignInModel(BaseModel):
    email: str
    password: str

@router.get("/users", tags=["users"])
async def read_all_users():
    response = supabase.table("users").select("*").execute()
    return response.data

@router.post("/create_user", tags=["users"])
async def create_user(user: userModel):
    response = supabase.auth.sign_up(
    {
        "email": user.email,
        "password": user.password,
        "options": {"data": {"full_name": user.name, "username": user.username}},
    }
)
    return response
@router.post("/sign_in", tags=["users"])
async def sign_in(user: SignInModel):
    response = supabase.auth.sign_in_with_password(
    {
        "email": user.email, 
        "password": user.password,
    }
)
    return response

@router.get("/sign_out", tags=["users"])
async def sign_out():
    response = supabase.auth.sign_out()
    return response


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
