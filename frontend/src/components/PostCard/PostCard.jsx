import React from "react";
import "./PostCard.css";

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      <div className="user-avatar" />
      <div className="post-content">
        <div className="post-question">{post.content}</div>

        {/* Render uploaded image if it exists */}
        {post.image && (
          <img
            src={post.image}
            alt="Uploaded"
            className="mt-2 rounded-md max-w-xs"
          />
        )}

        {/* Post Status */}
        <div className="post-status">
          <span>Status: {post.status || "Open"}</span>
        </div>

        {/* Post Tag */}
        <div className="post-tags">
          {post.tag && <span>Tag: {post.tag}</span>}
        </div>

        {/* Likes Section */}
        <div className="like-section">
          ❤️ {post.likes || 0}
        </div>
      </div>
    </div>
  );
};

// Function to determine class for tags
const tagClass = (tag) => {
  switch ((tag || "").toLowerCase()) {
    case "tips":
      return "tips";
    case "steps help":
      return "steps-help";
    case "object detection":
      return "object-detection";
    default:
      return "";
  }
};

export default PostCard;
