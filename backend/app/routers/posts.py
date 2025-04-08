from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.database import supabase, admin_supabase
from pydantic import BaseModel
from typing import List 
from uuid import UUID, uuid4
import pydantic


router = APIRouter() # Define the Router for defining routes

class Post(BaseModel): # Model for Posts
    id: int
    created_at: datetime
    post_text: str
    post_image: str
    is_solved: bool
    post_tags: List[str]
    user_id: UUID = uuid4()


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
                supabase.table("posts")
                .select("*")
                .eq("id", post_id)
                .execute() # Run the query to find the post
            )
            if not post: # If not a post, return 404
                raise HTTPException(status_code=404, detail="Post not found.")
            return post.data[0] # return the post
    except Exception as error: # Unless error, show generic error
        raise HTTPException(status_code=500, detail="Internal Server Error")
    
# Get a specific User's Posts
@router.get("/{user_id}/posts")
async def get_users_post(user_id: UUID):
    try:
        user_posts = ( 
            supabase.table("posts")
            .select("*")
            .eq("user_id", user_id)
            .execute()
        )
        if not user_posts:
            raise HTTPException(status_code=404, detail="User has not made any posts.")
        return user_posts.data
    except Exception as error:
        raise HTTPException(status_code=500, detail="Intenral Server Error.")


# Create a Post
@router.post("/create_post", tags=["posts"])
async def create_post(post: Post):
    pass

# Update Post
@router.put("/update_post/{post_id}", tags=["posts"])
async def update_post():
    pass

# Delete a Post
@router.delete("/delete_post/{post_id}", tags=["posts"])
async def delete_post():
    pass

    


