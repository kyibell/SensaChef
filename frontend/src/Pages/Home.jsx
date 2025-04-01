import { useNavigate } from "react-router-dom";
import Nav from "../components/Navigation/Navbar";
import RecipeList from "../components/HomeUI/RecipeList";


function Home() {
    const navigate = useNavigate();

    return(
        <>
            <Nav />
            <div style={{ textAlign: "Center", padding: "20px"}}>
                <h1 style={{ fontSize: "28px", color: "#000000" }}> Welcome to SensaChef</h1>
                <h2 style={{ color: "#000000" }}>Discover & Cook Your Favorite Recipes</h2>


{/*               <button 
                    onClick={() => navigate('/cookingmode')}
                    style={{
                        padding: "10px 20px",
                        background: "#ff6347",
                        color: "white",
                        border: "none",
                        borderradius: "5px",
                        cursor: "pointer",
                        fontSize: "16px",
                        marginTop: "10px"
                    }}
                >
                    Click to go into Cooking Mode
                </button>*/}
            </div>
{/*            <h1>Home</h1>
            <h2>Not complete</h2>
            <button onClick={() => navigate('/cookingmode')} >Click to go into cooking mode</button> */}
            <RecipeList />
        </>
    );
}

export default Home;