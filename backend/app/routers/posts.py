from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.database import supabase, admin_supabase
from pydantic import BaseModel
from typing import List 
import uuid
import pydantic


router = APIRouter() # Define the Router for defining routes

class Post(BaseModel): # Model for Posts
    id: int
    created_at: datetime.datetime
    post_text: str
    post_image: str
    is_solved: bool
    post_tags: List[str]
    user_id: uuid.UUID = pydantic.Field(default_factory=uuid.uuid4)


# Get All Posts
@router.get("/posts", tags=["posts"])
async def get_all_posts():
    try:
        response  = (
            supabase.table("posts")
            .select("*")
            .execute()
        )
        if not response.data:
            raise HTTPException(status_code=404, detail="No posts found.")
        return response.data
    except Exception as error:
        raise HTTPException(status_code=500, detail="Internal Server Error. Could not find posts.")

# Get a specific post
@router.get("/posts/{post_id}", tags=["posts"])
async def get_post(post_id: int):
    try:
        if post_id: # Check if its a post_id
            post = (
                supabase.from_("posts")
                .select("*")
                .eq("id",post_id)
                .execute() # Run the query to find the post
            )
            if not post: # If not a post, return 404
                raise HTTPException(status_code=404, detail="Post not found.")
            return post[0] # return the post
    except Exception as error: # Unless error, show generic error
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
# Get a specific User's Posts
@router.get("/posts/{user_id}")
async def get_users_post(user_id: int):
    try:
        user_posts = ( 
            supabase.from_("posts")
            .select("*")
            .eq("user_id", user_id)
            .execute()
        )
        if not user_posts:
            raise HTTPException(status_code=404, detail="User has not made any posts.")
        return user_posts
    except Exception as error:
        raise HTTPException(status_code=500, detail="Intenral Server Error.")


# Create a Post
@router.post("/create_post", tags=["posts"])
async def create_post(post: Post):
    pass

# Update Post

# Delete a Post

    


