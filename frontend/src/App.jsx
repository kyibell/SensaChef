import Nav from "./navbar.jsx";
import Content from "./Content.jsx";
import Timer from "./Timer.jsx";
import SpeechController from "./components/ttsAndStt/speechController.jsx";

function App() {
	return (
		<>
			<Nav />
			<div className="content-container">
				<div>
					<Content />
				</div>
        <div className="Speech-container">
					<SpeechController />
				</div>
				<div className="Timer-container">
					<Timer />
				</div>
			</div>
		</>
	);
}

export default App;
