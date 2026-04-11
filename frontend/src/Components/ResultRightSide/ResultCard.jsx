import { Link } from "react-router-dom"
import './ResultCard.css'
import { useLocation,useNavigate} from "react-router-dom";

function ResultCard(props) {
    const navigate=useNavigate();

    const location=useLocation;

    const eventName=location.state?.eventName;

    const handleClick=()=>{
        navigate('/winnerpage',{state:{eventName:props.eventName,eventId:props.eventId}})
    }

    

    return (
        <div className="cardContainer">
            <h2 className="election title">{props.eventName}</h2>
            {/* <h4 className="winnerTitle">Winner : winnerName</h4> */}
            <a className="detailsLink" onClick={handleClick}>Click to view details</a>
        </div>
    )
}
export default ResultCard;