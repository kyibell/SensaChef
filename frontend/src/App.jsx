import Nav from './navbar.jsx'
import Content from './Content.jsx';
<<<<<<< HEAD
import Timer from './Timer.jsx';

function App() {
    return(
      <>
        <Nav />
        <div className="content-container">
          <Content />
        </div>
        <Timer />
      </>
    );
=======
import SpeechController from './components/ttsAndStt/speechController.jsx';

function App() {
  return (
    <>
      <Nav />
      <div className="content-container">
        <Content />
      </div>
      <SpeechController />
    </>
  );
>>>>>>> client-side-tts
}

export default App