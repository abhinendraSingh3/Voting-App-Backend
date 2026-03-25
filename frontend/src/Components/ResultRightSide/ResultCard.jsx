import { Link } from "react-router-dom"
import './ResultCard.css'
import { useLocation } from "react-router-dom";
function ResultCard() {

    const location=useLocation;
    const eventName=location.state?.eventName;

    

    return (
        <div className="cardContainer">
            <h2 className="election title">Election title data</h2>
            <h4 className="winnerTitle">Winner : winnerName</h4>
            <Link className="detailsLink" to='/particularResul'>Click to view details</Link>
        </div>
    )
}
export default ResultCard;