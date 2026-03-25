import CompleteResult from "./CompleteResult";
import './WinnerPage.css'
const WinnerPage=()=>{
return(
    <>
    <div className="upperConti">
        <h1 className="eventId">eventName data</h1>
        <p className="eventIdName">Results</p>
    </div>
    <div className="winnerDiv">
    <h1 className="emoji" >🥇</h1>
    <h1 className="winnerName">winnerName</h1>
    <h2 className="votesT">totalVotes</h2>
    <p id="winnerTage">Winner</p>
    </div>
    <CompleteResult/>
    </>
)
}
export default WinnerPage;
