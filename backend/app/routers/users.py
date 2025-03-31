from fastapi import APIRouter, Depends
from app.database import supabase
from app.database import admin_supabase
from pydantic import BaseModel
from datetime import datetime, timezone
from fastapi import HTTPException
from app.auth.auth_handler import JWTBearer

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

@router.get("/recipes", tags=["recipes"])
async def get_all_recipes():
    response = supabase.table("recipes").select("*").execute()
    return response.data
# --------------------------------
# API endpoints for recipes:
@router.get("/recipes/{recipe_id}", tags=["recipes"])
async def get_recipe(recipe_id: int):
    response = supabase.table("recipes").select("*").eq("id", recipe_id).execute()
    return response.data[0]

@router.get("/recipes/{recipe_id}/steps", tags=["recipes"])
async def get_recipe_steps(recipe_id: int):
    try:
        recipe_exists = supabase.table("steps").select("id").eq("id", recipe_id).execute()
        if not recipe_exists.data:
            raise HTTPException(status_code=404, detail="Recipe not found")
        
        response = supabase.table("steps").select("*").eq("recipe_id", recipe_id).order("step_number").execute()
        return response.data
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    # query = supabase.table("steps").select("*").eq("recipe_id", recipe_id)
    # if step_number:
    #     query = query.eq("step_number", step_number)
    # response = query.execute()
    # return response.data
# ---------------------------------

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

@router.delete("/users/{user_id}", dependencies=[Depends(JWTBearer())], tags=["users"])
async def delete_user(user_id: str):
    response = supabase.table("users").delete().eq("user_id", user_id).execute()
    admin_supabase.auth.admin.delete_user(user_id)
    return response.data
