import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AiModel from "../components/AiModel/AiModel";
import PostList from "../components/Forum/PostList";

export default function Help() {
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#f59e0b", minHeight: "100vh", padding: "2rem" }}>
      {/* Outer Container - Wraps tags and posts */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "2rem",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        
        {/* Main Content Area */}
        <div style={{ flex: 3 }}>
          {/* AI Search Bar */}
          <div style={{ marginBottom: "1.5rem" }}>
            <AiModel />
          </div>

          {/* Filter + Create Post */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem"
          }}>
            <div style={{ display: "flex", gap: "1rem" }}>
              <button onClick={() => setFilter("All")} style={getTabStyle(filter === "All")}>All</button>
              <button onClick={() => setFilter("Open")} style={getTabStyle(filter === "Open")}>Open</button>
              <button onClick={() => setFilter("Solved")} style={getTabStyle(filter === "Solved")}>Solved</button>
            </div>
            <button
              onClick={() => navigate("/forum")}
              style={{
                background: "linear-gradient(to right, #6366f1, #8b5cf6)",
                color: "#fff",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "999px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              + Create Post
            </button>
          </div>

          {/* Posts List */}
          <PostList filter={filter} />
        </div>

        {/* Tags Sidebar */}
        <div style={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "1rem",
          height: "fit-content"
        }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>Tags</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={tagStyle("#22c55e")}>Tips</span>
            <span style={tagStyle("#b91c1c")}>Steps help</span>
            <span style={tagStyle("#7c3aed")}>Object detection</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTabStyle(active) {
  return {
    backgroundColor: active ? "#fff" : "transparent",
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    border: active ? "1px solid #000" : "none",
    fontWeight: "bold",
    cursor: "pointer",
    color: active ? "#000" : "#333"
  };
}

function tagStyle(bg) {
  return {
    backgroundColor: bg,
    color: "#fff",
    borderRadius: "999px",
    padding: "0.4rem 0.8rem",
    fontSize: "0.8rem"
  };
}
