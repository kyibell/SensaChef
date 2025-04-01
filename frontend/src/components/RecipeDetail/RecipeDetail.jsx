import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../RecipePageUI/RecipePageUI.css";

const RecipeDetail = () => {
  const { recipeName } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const recipeRes = await fetch(`http://localhost:8000/recipes/name/${recipeName}`);
        const recipeData = await recipeRes.json();

        const stepsRes = await fetch(`http://localhost:8000/recipes/${recipeData.id}/steps`);
        const stepsData = await stepsRes.json();

        setRecipe(recipeData);
        setSteps(stepsData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load recipe details.");
        setLoading(false);
      }
    };

    fetchRecipeData();
  }, [recipeName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className="recipe-detail" style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>{recipe["recipe-name"]}</h1>
      {recipe.image_url && (
        <img
          src={recipe.image_url || "https://via.placeholder.com/800x400?text=No+Image"}
          alt={recipe["recipe-name"]}
          style={{ width: "100%", borderRadius: "12px", marginBottom: "1rem" }}
        />
      )}
      <p>{recipe.description || "No description provided."}</p>

      <h3>Steps</h3>
      <ol style={{ paddingLeft: "1rem" }}>
        {steps.map((step, index) =>
          step.instruction ? (
            <li key={index} style={{ marginBottom: "1rem" }}>
              {step.instruction}
            </li>
          ) : null
        )}
      </ol>

      {/* Cooking Start button */}
      <div style={{ marginTop: "2rem" }}>
        <Link to={`/cookingmode/${recipe.id}`}>
          <button style={{ padding: "0.75rem 1.5rem", fontSize: "1rem" }}>Start Cooking</button>
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
