import { useNavigate } from "react-router-dom";
import RecipeList from "../components/HomeUI/RecipeList";

function Home() {

    const navigate = useNavigate();

    return(
        <>
            <h1>This is the home page</h1>
            <h2>Not complete</h2>
            <button onClick={() => navigate('/cookingmode')} >Click to go into cooking mode</button>
            <RecipeList />
        </>
    );
}

export default Home