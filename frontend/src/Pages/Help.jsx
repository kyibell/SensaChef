import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import AiModel from "../components/AiModel/AiModel";
import PostList from "../components/Forum/PostList";

export default function Help() {
  const [filter, setFilter] = useState("All");
  const [selectedTag, setSelectedTag] = useState(null);
  const navigate = useNavigate();

  const tags = ["Tips", "Object detection", "Ingredient Identification"];

  return (
    <div>
      <div style={{ backgroundColor: "#f59e0b", minHeight: "100vh", padding: "2rem" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "3fr 1fr", // RIGHT sidebar
            gap: "2rem",
          }}
        >
          {/* MAIN SECTION */}
          <div>
            {/* AI Model Search Bar */}
            <div style={{ marginBottom: "1.5rem" }}>
              <AiModel />
            </div>

            {/* Filter Buttons & Create */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                {["All", "Open", "Solved"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    style={getTabStyle(filter === item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate("/create-post")}
                style={{
                  background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  border: "none",
                  borderRadius: "999px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                + Create Post
              </button>
            </div>

            {/* Posts */}
            <PostList filter={filter} selectedTag={selectedTag} />
          </div>

          {/* TAGS SIDEBAR */}
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "1rem",
              height: "fit-content",
            }}
          >
            <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>Tags</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                  style={{
                    backgroundColor: tag === selectedTag ? "#6b7280" : getTagColor(tag),
                    color: "#fff",
                    borderRadius: "999px",
                    padding: "0.4rem 0.8rem",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Button style for filter
function getTabStyle(active) {
  return {
    backgroundColor: active ? "#fff" : "transparent",
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    border: active ? "1px solid #000" : "none",
    fontWeight: "bold",
    cursor: "pointer",
    color: active ? "#000" : "#333",
  };
}

// Background color for tags
function getTagColor(tag) {
  switch (tag) {
    case "Tips":
      return "#22c55e";
    case "Object detection":
      return "#7c3aed";
    case "Ingredient Identification":
      return "#0ea5e9"; // light blue
    default:
      return "#6b7280";
  }
}
