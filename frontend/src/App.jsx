import Nav from './navbar.jsx'
import Content from './Content.jsx';
import VoiceInput from './stt.jsx';
import TextToSpeech from './tts.jsx';
function App() {
    return(
      <>
        <Nav />
        <div className="content-container">
          <Content />
        </div>
        <VoiceInput />
        <TextToSpeech />
      </>
    );
}

export default App