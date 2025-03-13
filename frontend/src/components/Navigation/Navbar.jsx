import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Navbar.css';


function Nav() {

    const navigate = useNavigate();
    const location = useLocation();

    return(
        <header class="header">
            <a href="#" class="logo">SensaChef</a>
            <nav class="navbar">
                {location.pathname !== "/home" && (<a onClick={() => navigate('/home')} href="#">Home</a>)}
                {location.pathname !== "/login" && (<a onClick={() => navigate('/login')} href="#">Login</a>)}
                {location.pathname !=="/signup" && (<a onClick={() => navigate('/signup')} href="#">Sign-Up</a>)}
            </nav>
	    </header>
    );
}

export default Nav