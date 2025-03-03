import Nav from './navbar.jsx'
import Content from './Content.jsx';
import SearchRecipe from './SearchRecipe.jsx';

function App() {
    return(
      <>
        <Nav />
        <div className="content-container">
          <Content />
        </div>
        <SearchRecipe />
      </>
    );
}

export default App