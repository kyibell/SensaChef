import { useNavigate } from "react-router-dom";
import RecipeList from "../components/HomeUI/RecipeList";

function Home() {
  const navigate = useNavigate();

  return (
  <>
    <h1>This is the home page</h1>
     <RecipeList />
  </>
  )
}

export default Home;
