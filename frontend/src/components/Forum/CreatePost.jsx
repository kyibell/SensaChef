import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function CreatePost() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tags, setTags] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8000/create_post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    post_title: title,
                    post_text: content,
                    post_image: imageUrl,
                    post_tags: tags.split(',').map(tag => tag.trim())
                })
            });

            if(!response.ok) {
                throw new Error(await response.text());
            }

            const data = await response.json();
            console.log("post created: ", data);
            navigate('/posts');
        } catch (err) {
            console.log("Error creating post: ", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div style={{ padding: "2rem" }}>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Title" style={{ display: 'block', marginBottom: '1rem', width: '100%' }} />
                <textarea value={content} onChange={(e) => setContent(e.target.value)} required placeholder="Post content..." style={{ display: 'block', width: '100%', height: '150px', marginBottom: '1rem' }} />
                <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Post'}</button>
            </form>
        </div>
    );
}

export default CreatePost;