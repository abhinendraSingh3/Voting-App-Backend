import './DashBoardRight.css'
import api from '../../utils/axiosInterceptor'
import { useState, useEffect } from 'react'

const DashBoardRight = () => {
    let user = JSON.parse(localStorage.getItem('userData')) || {};
    let accesstoken = localStorage.getItem('accessToken')


    const [voteData, setVoteData] = useState([]);

    useEffect(() => {
        const fetchVotes = async () => {

            try {
                //send api
                const response = await api.get('/vote/myvotes', {
                    headers: {
                        Authorization: `Bearer ${accesstoken}`
                    }
                })
                console.log(response);
                const result=response.data.data
                if (response.data.success) {
                    
                    setVoteData([{
                        id: result._id,
                        club: result.election?.name,
                        votedFor: result.votedfor?.candidateName
                    }]);

                }

            }
            catch (error) {
                console.log("error aagya bhai", error)

            }

        }
        fetchVotes();

    },[]);


    return (
        <div className="right-conatainer">
            <div className="name">
                <h1>{user.name}</h1>
            </div>
            <div className="voteHistoryTab">



                <div className="heading-vote">
                    <h4>My Votes</h4>
                </div>

                <div className="votes-list">

                    {/* condition ? (true_part) : (false_part) */}
                    {voteData.length > 0 ? (


                        voteData.map((votes) => (
                            <li key={votes.id}>
                                <span className="club-name">• {votes.club}</span><br />
                                <span className="voteName">{votes.votedFor}</span>
                            </li>
                        ))

                    ) : (

                        <p className="no-votes">No votes yet</p>
                    )}

                </div>

            </div>


        </div>
    )

}
export default DashBoardRight;