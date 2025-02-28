import Nav from './navbar.jsx'
import Content from './Content.jsx';
import VoiceInput from './stt.jsx';
function App() {
    return(
      <>
        <Nav />
        <div className="content-container">
          <Content />
        </div>
        <VoiceInput />
      </>
    );
}

export default App