import Nav from "../components/Navigation/Navbar.jsx";
import Timer from "../components/Timer/Timer";
import VoiceInput from "../components/Speech/stt.jsx";
import SpeechController from "../components/Speech/speechController.jsx";
function CookingMode() {
    return(
        <>
            <h1>This is cooking mode page</h1>
            <Timer />
            <SpeechController />
        </>
    );
}

export default CookingMode