import Nav from './navbar.jsx'
import Content from './Content.jsx';
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
}

export default App