import './EventCard.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import VotingEvents from '../VotingEvents/VotingEvents'
import WinnerPage from '../WinnerSeperatePage/WinnerPage'
import defaultImg from '../../assets/set-empty-papers-copy-space.jpg'

function EventCard(props) {
    const navigate = useNavigate();

    const handleClickVoteNow = () => {
        navigate('/candidates', { state: { eventName: props.eventName,electionId:props.id } })
    }

    const handleClickResult = () => {
        navigate('/winnerpage', { state: { eventName: props.eventName,eventId:props.eventId } });
    }
    // {condition ?():condition ?:():() }

    return ( 
        <div className="llow">
            {/* left container */}
            <div className="badge">
                <img src={props.img || defaultImg} className="img-cardEvent" />
            </div>
            {/* center container */}
            <div className="event-details">
                <h2>{props.eventName}</h2>
                <h3>Status: {props.eventStatus}</h3>
                <p>End Date: {props.EndDate}</p>
            </div>
            {/* right container */}
            <div className="event-btn">
                {props.eventStatus == 'active' ? (
                    <button className="voteNow-button" type="button" onClick={handleClickVoteNow}>Vote Now</button>) :
                    props.eventStatus == 'pending' ? (<p className="waitResult">Kindly Wait for result</p>) :
                        props.eventStatus == 'closed' ? (<button className="vote-result" type="button" onClick={handleClickResult}>View Result</button>) : <p className="waitResult">Kindly Wait for result</p>
                }

            </div>

        </div>
    )
}

export default EventCard;