import { useNavigate } from "react-router-dom";
import RecipeList from "../components/HomeUI/RecipeList";

function Home() {
  const navigate = useNavigate();

  return (
  <>
     <RecipeList />
  </>
  )
}

export default Home;
