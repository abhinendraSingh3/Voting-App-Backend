import CompleteResult from "./CompleteResult";
import './WinnerPage.css'
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from './../../utils/axiosInterceptor'

const WinnerPage = () => {
    const location = useLocation();
    const eventName = location.state?.eventName;
    const electionId = location.state?.eventId;

    const [winnerData, setWinnerData] = useState([]);

    const accessToken = localStorage.getItem('token');

    useEffect(() => {
        const funcCall = async () => {
            const res = api.get('/result/winner', {
                params: {
                    electionId: electionId,
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            const result = (await res).data;
            console.log(result);


        }
        funcCall();
    }, [eventName])

    return (
        <>
            <div className="upperConti">
                <h1 className="eventId">{eventName}</h1>
                <p className="eventIdName">Results</p>
            </div>
            <div className="winnerDiv">
                <h1 className="emoji" >🥇</h1>
                <h1 className="winnerName">winnerName</h1>
                <h2 className="votesT">totalVotes</h2>
                <p id="winnerTage">Winner</p>
            </div>
            <CompleteResult />
        </>
    )
}
export default WinnerPage;
