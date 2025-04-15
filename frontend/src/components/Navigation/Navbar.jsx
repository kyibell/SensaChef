import { useNavigate, useLocation } from "react-router-dom";
import AiNav from "../AiNav/AiNav.jsx";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  return (
    <header className="header">
      <div>
        <a className="logo">SensaChef</a>
      </div>

      <div>
        <AiNav
          transcript={transcript}
          listening={listening}
          resetTranscript={resetTranscript}
          startListening={() =>
            SpeechRecognition.startListening({ continuous: false })
          }
          speak={speak}
        />
      </div>

      <div>
        <nav className="navbar">
          <a onClick={() => navigate("/home")} className={location.pathname === "/home" ? "active" : ""}>
            Home
          </a>
          <a onClick={() => navigate("/login")} className={location.pathname === "/login" ? "active" : ""}>
            Login
          </a>
          <a onClick={() => navigate("/signup")} className={location.pathname === "/signup" ? "active" : ""}>
            Sign-Up
          </a>
          <a onClick={() => navigate("/help")} className={location.pathname === "/help" ? "active" : ""}>
            Help
          </a>
          
          <Link
  to="/forum"  // Link to the Forum Page
  className={location.pathname === "/forum" ? "active" : ""}
  style={{ marginLeft: "1rem", color: "orange" }}
>
            ForumPage
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
