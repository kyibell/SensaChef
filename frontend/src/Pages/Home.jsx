import { useNavigate } from "react-router-dom";
import Nav from "../components/Navigation/Navbar";
import RecipeList from "../components/HomeUI/RecipeList";


const recipes = [
  { id: "pizza", title: "Margherita Pizza", image: "pizza.jpg" },
  { id: "pasta", title: "Spaghetti Carbonara", image: "pasta.jpg" },
  { id: "burger", title: "Juicy Cheeseburger", image: "burger.jpg" },
  { id: "toast", title: "Toast", image: "toast.jpg" },
  { id: "omelette", title: "Omelette", image: "omelette.jpg" },
  { id: "cereal", title: "Cereal", image: "cereal.jpg" },
  { id: "grilled_cheese", title: "Grilled Cheese", image: "grilled_cheese.jpg" },
];

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Nav />
      <h1>This is the home page</h1>
      <h2>Not complete</h2>
      
      <button onClick={() => navigate('/cookingmode')}>
        Click to go into cooking mode
      </button>

    return(
        <>
            <h1>This is the home page</h1>
            <h2>Not complete</h2>
            <button onClick={() => navigate('/cookingmode')} >Click to go into cooking mode</button>
            <RecipeList />
        </>
    );
  </>
  )
}

export default Home;
