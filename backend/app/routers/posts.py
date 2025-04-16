from fastapi import APIRouter, HTTPException
from datetime import datetime
from app.database import supabase, admin_supabase
from pydantic import BaseModel, Field 
from uuid import UUID
import pydantic


router = APIRouter() # Define the Router for defining routes

class Post(BaseModel): # Model for Posts
    post_title: str = Field(..., min_length=5, description="title of the post")
    post_text: str = Field(..., min_length=1, max_length=1000, description="The content of the post")
    post_image: str = Field(..., description="The image URL of the Post")
    post_tags: list[str] = Field(..., min_length=1, description="Tags assigned to the post")
    user_id: UUID  = Field(...,description="The User ID Creating the post")


# Get All Posts
@router.get("/posts", tags=["posts"])
async def get_all_posts():
    try:
        response  = (
            supabase.table("posts")
            .select("*, users(username)")
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
                .select("*, users(username)")
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
@router.post("/{user_id}/create_post", tags=["posts"], status_code=201) 
async def create_post(post: Post, user_id: UUID):
    try:
        creation_date = datetime.now().isoformat() + "Z" # Iso format is what supabase uses

        db_user = supabase.table("users").select("*").eq("id", user_id) # Check for user existance
        if not db_user:
            raise HTTPException(status_code=404, detail="User not found.")
        post_data = { # Put the data in an object
            "created_at": creation_date, 
            "post_title": post.post_title,
            "post_image": post.post_image if post.post_image else None,
            "post_tags": post.post_tags,
            "user_id": str(post.user_id), # Convert to Str bc Supabase Can't read in the UUID Obj.
            "post_text": post.post_text 
        }

        response = supabase.table("posts").insert(post_data).execute() # Run Insertion

        if response:
            return response # Return response if successful
        else:
            raise HTTPException(status_code=400,detail="Error creating post.")
    except Exception as error:
        raise HTTPException(status_code=500, detail="Internal Server Error")
        print(error)


# Update Post
@router.put("/update_post/{post_id}", tags=["posts"])
async def update_post(post_id: int, post: Post):
    try:
        post = supabase.table("posts").update({"post_title": post.post_title,
                                           "post_text": post.post_text,
                                           "post_image": post.post_image
                                           }).eq("id", post_id).execute()
        return post.data
    except Exception as error:
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Delete a Post
@router.delete("/delete_post/{post_id}", tags=["posts"])
async def delete_post(post_id: int):
    try:
        post = supabase.table("posts").delete().eq("id", post_id).execute()
        return {"message": "Post deleted successfully."}
    except Exception as error:
        raise HTTPException(status_code=500, detail="Internal Server Error")

    


