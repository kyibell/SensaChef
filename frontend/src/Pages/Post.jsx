import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function Post({}) {

    const {post_id} = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect( () => {

        const fetchPostData = async () => {

            try{
                const postResponse = await fetch(`http://localhost:8000/posts/${post_id}`);
                if (!postResponse.ok){
                    throw new Error('Post not found');
                }
                const postData = await postResponse.json();
                setPost(postData);

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

    return (
        <div className="post-detail">
            <span style={{
                        color: post.is_solved ? "green" : "red",
                    }}>{post.is_solved ? 'Solved' : 'Unsolved'}
            </span>
            <h1>{post.post_title}</h1>
            <p>{post.post_text}</p>
            <p>Posted by: {post.users?.username || 'Unkown user'}</p>

            {post.post_image && (
                <img src={post.post_image} alt={post.post_title} />
            )}
            {post.post_tags?.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
                            {post.post_tags.map((tag, index) => (
                            <span 
                                key={index}
                                style={{
                                backgroundColor: '#e0e0e0',
                                color: '#333',
                                padding: '3px 8px',
                                borderRadius: '12px',
                                fontSize: '0.8em'
                                }}
                            >
                                {tag}
                            </span>
                            ))}
                        </div>
            )}
        </div>
    )
}
export default Post;
