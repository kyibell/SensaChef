import { useNavigate } from "react-router-dom";
import "./RecipePageUI.css"; // Import CSS

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  
  return (
    <div className="recipe-card" onClick={() => navigate(`/recipe/${recipe.id}`)}>
      <img src={`/images/${recipe.image}`} alt={recipe.title} />
      <h3>{recipe.title}</h3>
    </div>
  );
}

export default RecipeCard;
