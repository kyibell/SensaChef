import Nav from './navbar.jsx'
import Content from './Content.jsx';
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
}

export default App