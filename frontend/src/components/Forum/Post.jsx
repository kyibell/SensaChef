import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Post({}) {

    const {post_id} = useParams();
    const [post, setPost] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {

        const fetchPostData = async () => {

            try{
                const postResponse = await fetch(`http://localhost:8000/posts/${post_id}`);
                if (!recipeResponse.ok){
                    throw new Error('Post not found');
                }
                const postData = await postResponse.json();
                setPostName(postData['post_title']);

            } catch (err) {
                console.log("Fetch failed: ", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } ;
        fetchPostData();
    }, [post_id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!post) return <div>Post not found</div>;
}
