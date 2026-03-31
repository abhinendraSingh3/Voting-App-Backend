import './EventCard.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import VotingEvents from '../VotingEvents/VotingEvents'
import WinnerPage from '../WinnerSeperatePage/WinnerPage'

function EventCard(props) {
    const navigate = useNavigate();

    const handleClickVoteNow = () => {
        navigate('/candidates', { state: { eventName: props.eventName } })
    }

    const handleClickResult = () => {
        navigate('/winnerpage',{state:{eventName:props.eventName}});
    }
    // {condition ?():condition ?:():() }

    return (
        <div className="llow">
            {/* left container */}
            <div className="badge">
                <img src="" className="img-cardEvent" />
            </div>
            {/* center container */}
            <div className="event-details">
                <h2>{props.eventName}</h2>
                <h3>Status: {props.eventStatus}</h3>
                <p>End Date: {props.EndDate}</p>
            </div>
            {/* right container */}
            <div className="event-btn">
                {props.eventStatus == 'Active' ? (
                    <button className="voteNow-button" type="button" onClick={handleClickVoteNow}>Vote Now</button>) :
                    props.eventStatus == 'Pending' ? (<p className="waitResult">Kindly Wait for result</p>) :
                        props.eventStatus == 'Result Out' ? (<button className="vote-result" type="button" onClick={handleClickResult}>View Result</button>) :
                            <p className="waitResult">Kindly Wait for result</p>
                }

            </div>

        </div>
    )
}

export default EventCard;