import { useNavigate } from "react-router-dom";
import "./RecipePageUI.css"; // Import CSS

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  
  return (
    <div className="recipe-card" onClick={() => navigate(`/recipe/${recipe.id}`)}>
      <img src={`/images/${recipe.image}`} alt={recipe.title} />
      <div className="card-body">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-descirption">
          {recipe.descirption || "No description available."}
        </p>
      </div>
      
      <div className="card-footer">
        <button className="cook-now-btn">Cook Now</button>
      </div>
    </div>
  );
}

export default RecipeCard;
