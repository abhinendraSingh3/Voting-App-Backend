import CandidatesContainer from "./CandidatesContainer";
import './CandidateCard.css'
function CandidateCard(props){
    
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
            <button className="vote-btn">Vote</button>
        </div>
    )
}
export default CandidateCard;