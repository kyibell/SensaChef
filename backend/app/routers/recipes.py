from fastapi import APIRouter, HTTPException
from app.database import supabase
from pydantic import BaseModel # For Input Validation
from uuid import UUID

router = APIRouter() 

# RECIPE ROUTES 
# --------------------------------
class Recipe(BaseModel):
    recipe_name: str
    recipe_image: str
    recipe_tags: list[str]
    recipe_description: str
    user_id = UUID



# Get all Recipes
@router.get("/recipes", tags=["recipes"])
async def get_all_recipes():
    try:
        response = supabase.table("recipes").select("*").execute()
        if not response.data:
            raise HTTPException(status_code=404, detail="No recipes found.")
        return response.data
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

# # Fetch One Recipe
@router.get("/recipes/{recipe_id}", tags=["recipes"])
async def get_recipe(recipe_id: int):
    response = supabase.table("recipes").select("*").eq("id", recipe_id).execute()
    return response.data[0]

# Fetch Recipe Steps
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


@router.get("/recipes/name/{recipe_name}", tags=["recipes"])
async def get_recipe_by_name(recipe_name: str):
    response = supabase.table("recipes").select("*").eq("recipe-name", recipe_name).execute()
    if not response.data:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return response.data[0]


# Create A Recipe
@router.post("/create_recipe", tags=["recipes"])
async def create_recipe():
    pass

# Update A Recipe
@router.put("/update_recipe/{recipe_id}", tags=["recipes"])
async def update_recipe():
    pass

# Delete a Recipe
@router.delete("/delete_recipe/{recipe_id}", tags=["recipes"])
async def delete_recipe():
    pass