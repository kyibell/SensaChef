import { useParams, useNavigate } from "react-router-dom";
import "../components/RecipePageUI/RecipePageUI.css";


const recipes = {
  pizza: { 
    title: "Margherita Pizza", 
    image: "pizza.jpg", 
    description: "A classic Italian pizza made with a simple yet delicious combination of fresh tomatoes, mozzarella cheese, fresh basil, olive oil, and a perfectly crispy thin crust. This pizza is known for its fresh flavors and minimal ingredients, making it a favorite worldwide.", 
    ingredients: ["Pizza Dough", "Tomato Sauce", "Mozzarella Cheese", "Fresh Basil", "Olive Oil"] 
  },

  pasta: { 
    title: "Spaghetti Carbonara", 
    image: "pasta.jpg", 
    description: "An authentic Italian pasta dish featuring a creamy and rich sauce made from eggs, Parmesan cheese, pancetta, and freshly ground black pepper. A simple yet indulgent classic from Rome.", 
    ingredients: ["Spaghetti", "Eggs", "Pancetta", "Parmesan Cheese", "Black Pepper"] 
  },

  burger: { 
    title: "Juicy Cheeseburger", 
    image: "burger.jpg", 
    description: "A mouthwatering, grilled-to-perfection beef patty topped with melted cheese, crisp lettuce, ripe tomatoes, and a soft sesame seed bun. The perfect combination of juicy and cheesy goodness.", 
    ingredients: ["Beef Patty", "Cheddar Cheese", "Lettuce", "Tomato", "Sesame Bun", "Pickles (optional)"] 
  },

  toast: { 
    title: "Toast", 
    image: "toast.jpg", 
    description: "A crispy, golden-brown slice of bread, toasted to perfection and served with butter, jam, or honey. A simple but satisfying breakfast staple.", 
    ingredients: ["Bread", "Butter", "Jam or Honey (optional)"] 
  },

  omelette: { 
    title: "Omelette", 
    image: "omelette.jpg", 
    description: "A fluffy and protein-packed breakfast dish made with eggs, butter, and a variety of fillings like cheese, herbs, and vegetables. A quick and customizable meal.", 
    ingredients: ["Eggs", "Milk", "Butter", "Cheese", "Salt", "Pepper"] 
  },

  cereal: { 
    title: "Cereal", 
    image: "cereal.jpg", 
    description: "A quick and healthy breakfast option consisting of crunchy cereal, cold milk, and optional fresh fruit toppings. Perfect for busy mornings.", 
    ingredients: ["Cereal", "Milk", "Fruits (optional)"] 
  },

  grilled_cheese: { 
    title: "Grilled Cheese", 
    image: "grilled_cheese.jpg", 
    description: "A buttery, golden-crisp sandwich filled with gooey melted cheese. A simple but classic comfort food best enjoyed with a warm bowl of tomato soup.", 
    ingredients: ["Bread", "Cheese", "Butter"] 
  }
};

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes[id];

  if (!recipe) return <h2>Recipe not found</h2>;

  return (
    <div className="recipe-container">
      <img src={`/images/${recipe.image}`} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <h3>Ingredients:</h3>
      <ul>{recipe.ingredients.map((item, index) => <li key={index}>{item}</li>)}</ul>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
}

export default RecipeDetail;
