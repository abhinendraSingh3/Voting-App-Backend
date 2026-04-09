import CandidatesContainer from "./CandidatesContainer";
import './CandidateCard.css'
import { useEffect } from "react";
import api from "../../utils/axiosInterceptor";


function CandidateCard(props) {
    const accesstoken = localStorage.getItem('token');

    const handleVote = () => {
        //candidateid
        //electionId
        //they are being send in req body

    }

    return (
        <div className="candidateMain">
            {/* top */}
            <div className="candi-image">
                <img src={props.pImg} alt={props.pName}></img>
            </div>
            {/* middle */}
            <div className="candidate-details">
                <h2> {props.pName}</h2>
                <h3>{props.pManifesto}</h3>
                <h4>{props.pPosition}</h4>
                <h4>{props.pDepartment}</h4>
                <h4>{props.pYear}</h4>
                <h4>{props.pContact}</h4>
            </div>
            {/* bottom */}
            {props.hasVoted ? (
                <p className="already-voted">You have already voted in this event</p>
            ) : (
                <button className="vote-btn" onClick={handleVote}>Vote</button>
            )}
        </div>
    )
}
export default CandidateCard;