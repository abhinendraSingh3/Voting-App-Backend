import { Link } from "react-router-dom"
import './ResultCard.css'
import { useLocation, useNavigate } from "react-router-dom";

function ResultCard(props) {
    
// console.log('while loading resultCard--> ',props.eventId)
    return (
        <div className="cardContainer">
            <h2 className="election title">{props.eventName || "No event"}</h2>
            {/* <h4 className="winnerTitle">Winner : winnerName</h4> */}
            <Link
                to="/winnerpage"
                state={{ eventName: props.eventName, eventId: props.eventId }}
                className="detailsLink">
                Click to view details</Link>
        </div>
    )
}
export default ResultCard;