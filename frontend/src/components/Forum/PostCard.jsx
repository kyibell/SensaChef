// src/components/Forum/PostCard.jsx

import React from "react";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const getTagColor = (tag) => {
    switch (tag) {
      case "Tips":
        return "#22c55e";
      case "Steps help":
        return "#b91c1c";
      case "Object detection":
        return "#7c3aed";
      default:
        return "#6b7280";
    }
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "1.25rem",
        marginBottom: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "transform 0.2s ease-in-out",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "1rem",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* LEFT: Avatar + Post */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flex: 1 }}>
        {/* Avatar */}
        <img
          src="https://www.gravatar.com/avatar/?d=mp"
          alt="avatar"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />

        {/* Post Content */}
        <div>
          <Link
            to={`/posts/${post.id}`}
            style={{
              textDecoration: "none",
              color: "#222",
              fontWeight: "bold",
              fontSize: "1.1rem",
              display: "block",
              marginBottom: "0.25rem",
            }}
          >
            {post.title}
          </Link>

          <p style={{ color: "#555", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
            {post.description}
          </p>

          <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>
            By {post.author}
          </p>

          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {post.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: getTagColor(tag),
                  color: "white",
                  fontSize: "0.75rem",
                  padding: "0.3rem 0.8rem",
                  borderRadius: "999px",
                  fontWeight: "bold",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Like and Status */}
      <div style={{ textAlign: "center", minWidth: "60px" }}>
        <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>
          {post.likes > 0 ? "❤️" : "🤍"}
        </div>
        <div style={{ fontSize: "0.8rem", color: "#555" }}>{post.likes}</div>
        <div
          style={{
            fontSize: "0.75rem",
            fontWeight: "bold",
            color: post.status === "Solved" ? "green" : "red",
            marginTop: "0.25rem",
          }}
        >
          {post.status}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
