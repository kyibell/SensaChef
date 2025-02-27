import Nav from './navbar.jsx'
import Content from './Content.jsx';

function App() {
    return(
      <>
        <Nav />
        <div className="content-container">
          <Content />
        </div>
      </>
    );
}

export default App