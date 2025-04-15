// src/components/PostList/PostList.jsx
import React, { useState, useEffect } from "react";
import PostCard from "../PostCard/PostCard"; // Import the PostCard component

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Truncate post descriptions that are too long
  const shortenText = (text, maxLength = 100) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`https://sensachef-backend.onrender.com/posts`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
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
      {posts.length === 0 ? (
        <p>No posts available. Be the first to post!</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;
