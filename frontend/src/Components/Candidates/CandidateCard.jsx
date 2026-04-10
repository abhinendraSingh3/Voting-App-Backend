import CandidatesContainer from "./CandidatesContainer";
import './CandidateCard.css'
import { useEffect,useState } from "react";
import api from "../../utils/axiosInterceptor";


function CandidateCard(props) {
    const accesstoken = localStorage.getItem('token');


    const handleVote = async () => {
        try {

            const res = await api.post('/vote/casteVote', 
                {
                candidateid: props.candidateId,
                electionid: props.electionId
                },{
                headers: {
                    Authorization: `Bearer ${accesstoken}`
                }}
            )
            if (res.data.success) {
                console.log(res.data.hasVoted)
                setHasVoted(res.data.hasVoted)
                

            }

        }
        catch (error) {
            console.log("error occured at candidateCard fetch-----> ", error);
        }

    }

    useEffect(()=>{

    })

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