import { useNavigate } from "react-router-dom";
import Nav from "../components/Navigation/Navbar";


function Home() {

    const navigate = useNavigate();

    return(
        <>
            <h1>This is the home page</h1>
            <h2>Not complete</h2>
            <button onClick={() => navigate('/cookingmode')} >Click to go into cooking mode</button>
        </>
    );
}

export default Home