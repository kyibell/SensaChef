// src/Pages/Home.jsx
import { useNavigate } from "react-router-dom";
import RecipeList from "../components/HomeUI/RecipeList";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <button
          onClick={() => navigate("/create-recipe")}
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
        + Create Recipe
      </button>
      <RecipeList />
    </>
  );
}

export default Home;
