import ScanIcon from '../../../assets/Scan.svg'
import '../Buttons.css';

function ScanButton() {
    
    return(
        <button className="buttons">
        <img className="scan-icon" src={ScanIcon} alt="Scan" />
        Scan Ingredients
        </button>
    );

}

export default ScanButton