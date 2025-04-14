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
@router.post("/create_recipe", tags=["recipes"],status_code=201)
async def create_recipe(recipe: Recipe, user_id: UUID):
    try:
        db_user = supabase.table("users").select("*").eq("id", user_id)
        if not db_user:
            raise HTTPException(status_code=404, detail="User Not Found.")
        recipe_data = {
            "recipe-name": recipe.recipe_name,
            "image_url": recipe.recipe_image,
            "image_tags": recipe.recipe_tags,
            "description": recipe.recipe_description,
            "user_id": str(recipe.user_id)
        }

        response = supabase.table("recipes").insert(recipe_data).execute()

        if response:
            return response
        else:
            raise HTTPException(status_code=400, detail="Error creating recipe")
    except Exception as error:
        raise HTTPException(status_code=500, detail="Internal Server Error.")

# Update A Recipe
@router.put("/update_recipe/{recipe_id}", tags=["recipes"])
async def update_recipe():
    pass

# Delete a Recipe
@router.delete("/delete_recipe/{recipe_id}", tags=["recipes"])
async def delete_recipe():
    pass