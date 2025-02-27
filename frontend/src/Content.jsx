import SearchIcon from './assets/Search.svg';
import ScanIcon from './assets/Scan.svg';

function Content() {
    return(
        <div className="button-container">
            <button className="buttons">Order Ingredients</button>
            <button className="buttons"><img className="scan-icon" src={ScanIcon} />Scan Ingredients</button>
            <button className="buttons"><img className="search-icon" src={SearchIcon}/>Search Recipes</button>
        </div>
    );
}

export default Content
