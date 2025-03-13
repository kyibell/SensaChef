import { useNavigate } from 'react-router-dom';
import './Navbar.css';


function Nav() {

    const navigate = useNavigate();

    return(
        <header class="header">
            <a href="#" class="logo">SensaChef</a>
            <nav class="navbar">
                <a onClick={() => navigate('/home')} href="#">Home</a>
                <a onClick={() => navigate('/login')} href="#">Login</a>
                <a onClick={() => navigate('/signup')} href="#">Sign-Up</a>
            </nav>
	    </header>
    );
}

export default Nav