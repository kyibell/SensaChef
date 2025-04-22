import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Forum.css';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleImage = (e) => {
        if(e.target.files && e.target.files[0]){
            setImage(e.target.files?.[0] || null);
        }
    }

    const handleTag = (tag) => {
        setTags(prevTags => prevTags ? `${prevTags}, ${tag}` : tag);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {

            const token = sessionStorage.getItem('access_token');
            if (!token) throw new Error("User not authenticated. Log in");

            const userInfoResponse = await fetch('http://localhost:8000/protected', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!userInfoResponse.ok){
                throw new Error("Failed to get user info");
            }

            const userInfo = await userInfoResponse.json();
            const userId = userInfo.payload.sub;

            // const userId = '9ea35ad8-c183-4755-9594-4f7bf5d72819'; // temporary hardcoded userId
            // if (!userId) throw new Error("User not authenticated. Please log in");

            const formData = new FormData();
            formData.append('title', title);
            formData.append('text', content);

            if (image) {
                formData.append('image', image);
            }

            if (tags) {
                formData.append('tags', tags.split(',').map(tag => tag.trim()));

            }

            // for prod
            const response = await fetch(`https://sensachef-backend.onrender.com/${userId}/create_post`,{
                
            // for dev
            // const response = await fetch(`http://localhost:8000/${userId}/create_post`, {
                method: 'POST',
                body: formData,
            });

            if(!response.ok) {
                const errorData = await response.json();
                console.log("Full error: ", errorData);
                throw new Error(errorData.detail || "Failed to create post");
            }

            const data = await response.json();
            console.log("post created: ", data);
            navigate('/help');
        } catch (err) {
            console.log("Error creating post: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="create-post-container">
            <h2>Create a New Post</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="title">Title:</label>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} required id="title" type="text" placeholder="Enter Post Title" />
                </div>

                <div className="form-row">
                    <label htmlFor="content">Content:</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required id="content" placeholder="Post content..." />
                </div>

                <div className="form-row">
                    <label htmlFor="tags">Tags:</label>
                    <input value={tags} onChange={(e) => setTags(e.target.value)}id="tags" type="text" placeholder="e.g. Tips, Cooking, Help" />
                </div>

                <div className="tag-options">
                    {["Tips", "Object Detection", "Ingredient Identification"].map((tag, index) => (
                        <span
                            key={index}
                            className="tag-bubble"
                            onClick={() => {
                                handleTag(tag)
                    }}
                >
                    {tag}
                </span>
                ))}
                </div>
                    

                <div className="form-row">
                    <label htmlFor="image"> Image:</label>
                    <input onChange={handleImage} id="image" type="file" accept="image/*" />
                </div>

                <button type="submit">{loading ? 'Creating...' : 'Submit'}</button>
            </form>
        </div>
  );
}

export default CreatePost;