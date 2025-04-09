import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // truncate post descriptions that are too short
  const shortenText = (text, maxLength = 100) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;

    return `${text.substring(0, maxLength)}...`;
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:8000/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.log("Fetch error details: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
        <h1>Posts</h1>
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    <h2 style={{cursor: 'pointer'}}>
                        <Link
                            to={`/posts/${post.id}`}
                        >
                        {post['post_title']}
                        </Link>
                    </h2>
                    <p>{shortenText(post.post_text)}</p>
                    <p>By {post.user_id}</p>
                    <span style={{
                        color: post.is_solved ? "green" : "red",
                    }}>{post.is_solved ? 'Solved' : 'Unsolved'}</span>
                    
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
                </li>
            ))}
        </ul>
    </div>
  );
}

export default PostList;
