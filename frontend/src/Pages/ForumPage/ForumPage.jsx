import React, { useState } from "react";
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";
import PostCard from "../../components/PostCard/PostCard";
import "./ForumPage.css";

const ForumPage = () => {
  const [posts, setPosts] = useState([]); // State for storing posts
  const [filter, setFilter] = useState("All"); // State for filter (All, Open, Solved)
  const [tagFilter, setTagFilter] = useState(""); // State for tag filter

  // Create new post function
  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]); // Add new post to the beginning of the list
  };

  // Filter posts based on the selected filter and tag
  const filteredPosts = posts.filter((post) =>
    (filter === "All" || post.status === filter) &&
    (tagFilter === "" || post.tag === tagFilter)
  );

  return (
    <div className="forum-page">
      <h1 className="forum-title">Community Forum</h1>

      {/* Create New Post */}
      <CreatePostForm onCreatePost={handleCreatePost} />

      {/* Filter Buttons */}
      <div className="filter-buttons">
        {["All", "Open", "Solved"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`filter-button ${filter === status ? "active" : ""}`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="forum-content">
        {/* Left - Filtered Posts */}
        <div className="post-list">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))
          ) : (
            <p>No posts available. Be the first to create one!</p>
          )}
        </div>

        {/* Right - Tags Filter */}
        <div className="tags-box">
          <h2>Tags</h2>
          <div className="tags">
            {["Tips", "Steps help", "Object detection"].map((tag) => (
              <button
                key={tag}
                onClick={() => setTagFilter(tag)}
                className={`tag ${tagFilter === tag ? "active" : ""}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;
