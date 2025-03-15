import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Navbar.css";

function Nav() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<header class="header">
			<a class="logo">
				SensaChef
			</a>
			<nav class="navbar">
				<a
					onClick={() => navigate("/home")}
					className={location.pathname === "/home" ? "active" : ""}>
					Home
				</a>
				<a
					onClick={() => navigate("/login")}
					className={location.pathname === "/login" ? "active" : ""}>
					Login
				</a>
				<a
					onClick={() => navigate("/signup")}
					className={location.pathname === "/signup" ? "active" : ""}>
					Sign-Up
				</a>
			</nav>
		</header>
	);
}

export default Nav;
