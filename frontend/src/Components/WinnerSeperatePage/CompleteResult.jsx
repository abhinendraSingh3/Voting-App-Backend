
import WinnerPage from "./WinnerPage";
import './CompleteResult.css'
function CompleteResult(props) {
    return (
        <div className="CompleteBigDiv">
            <h2 className="completeHeading">Complete Results</h2>

            {props.candidateResult.map((items, index) => {
                // <div key={index}>
                return(
                <div className="resultBar" key={index}>

                    <h3 className="participantName">{items.name}</h3>
                    <h3 className="participantsTotalVotes">Total Votes : {items.votes}</h3>
                </div>
                )

                {/* </div> */ }
            })}



        </div>
    )

}
export default CompleteResult;