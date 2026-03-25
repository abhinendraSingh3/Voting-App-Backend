import './DashBoardRight.css'
function DashBoardRight() {
    let user = JSON.parse(localStorage.getItem('userData')) || {};

    const votingHistory = [
    {
        id: 1,
        club: "Student Council president",
        votedFor: "john",
    },
    {
        id: 2,
        club: "Inter Council president",
        votedFor: "jane"
    }, {
        id: 3,
        club: "Inter Council president",
        votedFor: "jane"
    },
    {
        id: 4,
        club: "Inter Council president",
        votedFor: "jane"
    },
    {
        id: 5,
        club: "Inter Council president",
        votedFor: "jane"
    },
    {
        id: 6,
        club: "Inter Council president",
        votedFor: "jane"
    },
    {
        id: 7,
        club: "Inter Council president",
        votedFor: "jane"
    }
    ,
    {
        id: 8,
        club: "Inter Council president",
        votedFor: "jane"
    }
    ,
    {
        id: 9,
        club: "Inter Council president",
        votedFor: "jane" }
    

    ]

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
                    {votingHistory.length > 0 ? (


                        votingHistory.map((votes) => (
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