
const candidateSch = require('./../models/candidate')
const studentSchema = require('./../models/studentSchema');
const student = require('./../models/studentSchema');
const elections = require('../models/electionSchema')
const voteSch = require('../models/voteSchema');

// castVote()       // student casts vote (checks isVoted first)
// getResults()     // get full results/leaderboard

<<<<<<< HEAD
//-------------viewResult-----------
const voteResult = async (req, res) => {
    try {
        
        const closedElections =await elections.find({ status: 'closed' })

        if (!closedElections || closedElections.length === 0) {
            return res.status(404).json(
                {
                    success: false,
                    message: "No results are out now"
                }
            )
        }
        return res.status(200).json({
            success: true,
            data: closedElections
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

//winner candidate
const winner=async(req,res)=>{
try{
    const electionId=req.query.electionId;
    console.log(electionId);
    
    
    //winner
    const winnerOne=await candidateSch.find({elections:electionId}).sort({voteCount:-1})
    console.log(winnerOne)
    const winnerDetails=winnerOne[0];

    //allcandidates
    const ranked=winnerOne.map((c,index)=>({
        name:c.candidateName,
        votes:c.voteCount,
        position:index+1
    }));


    return res.status(200).json({
        success:true,
        winName:winnerDetails?.candidateName,
        winnerVoteCount:winnerDetails?.voteCount,
        data:ranked
    })

}
catch(error){
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    })
}
}
=======
>>>>>>> b7303b3509789b5b10b88e70611d3bb3e4c60368

//-------------voting Events display-------------
const voteevents = async (req, res) => {
    try {

        const events = await elections.find();
        if (!events) {
            return res.status(404).json({
                success: false,
                message: "No events going on"
            })
        }

        return res.status(200).json({
            success: true,
            data: events,
            message: "data fetched Successfully"
        })


    } catch (errr) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}


// getVoteStatus()- Logged in student checks their own vote status:
const voteStatus = async (req, res) => {
    try {

        const studentid = req.data.userId;

        const studentData = await student.findById(studentid);

        if (!studentData) {
            return res.status(404).json({
                success: false, message: 'student not found'
            });
        }

        // Check if student has voted 
        const voteCheck = await voteSch.findOne({ voter: studentid }).populate([
            { path: 'votedfor' },
            { path: 'election' },
        ]);

        // if(!voteCheck){
        //     return res.status(401).json({
        //         success:false,
        //         message:"no votes"
        //     })
        // }
        // student has voted 

        return res.status(200).json({ success: true, data: voteCheck });
    }
    catch (error) {
        console.log("error is here");
        return res.status(500).json({ message: "Internal server error" })
    }
}

//-------------vote results-------------------
const votecounts = async () => {
    try {

        //get vote count of each candidates
        const candidateVotes = await candidateSch.find().sort({ voteCount: 'desc' });

        if (!candidateVotes) {
            return res.status(404).json({
                success: false,
                message: "No candidate found"
            })
        }
        const vrecord = await candidateVotes.map((data) => ({
            candidateName: data.candidateName,
            totalVotes: data.voteCount
        }))

        //compare by values whose vote count is higher that is winner
        //count second highest
        //count third highest
        //return the value of these three

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//-------checkVote-------------
const checkVote = async (req, res) => {
    try {
<<<<<<< HEAD

        const studentid = req.data.userId; //extract studentId from authmiddleware c


        const electionid = req.query.electionid;


=======
        
        const studentid = req.data.userId; //extract studentId from authmiddleware c
        
        
        const electionid = req.query.electionid;
       
        
>>>>>>> b7303b3509789b5b10b88e70611d3bb3e4c60368
        //find the candidate document with specific candidateid
        const alreadyVoted = await voteSch.findOne({ voter: studentid, election: electionid });

        if (alreadyVoted) {
            return res.status(200).json({
                success: true,
                hasVoted: true,
                message: "you have already voted"
            })
<<<<<<< HEAD

        }
        return res.status(200).json({
            success: true,
            hasVoted: false,
            message: "you have not voted"
=======
            
        }
        return res.status(200).json({
            success:true,
            hasVoted:false,
            message:"you have not voted"
>>>>>>> b7303b3509789b5b10b88e70611d3bb3e4c60368
        })

    }
    catch (error) {

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                hasVoted: true,
                message: "You have already voted!"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error"

        })
    }
}

//-----casteVote-------------------------
const castevote = async (req, res) => {
    //no admin can vote
    //only student can vote only once
    try {
<<<<<<< HEAD

=======
        
>>>>>>> b7303b3509789b5b10b88e70611d3bb3e4c60368
        const studentid = req.data.userId; //extract studentId from authmiddleware 
        const { candidateid, electionid } = req.body;

        //save votes in voteSchema
        const newVote = new voteSch({
            voter: studentid,
            votedfor: candidateid,
            election: electionid
        })

        await newVote.save();

        //update in candidateSchema
        const resp = await candidateSch.findByIdAndUpdate(candidateid, {
            $inc: { voteCount: 1 }
        })
        console.log("it is under votecontroller-castvotes-->", resp);

        return res.status(200).json({
            success: true,
            hasVoted: true,
            message: "Vote cast successfully"
        })

    }
    catch (error) {
        // handle duplicate vote error from compound index
        return res.status(500).json({ message: "Internal server error" })
    }
}

// const createEvent = async (req, res) => {
//     try {
//         //extract valid data from body
//         const { title, startTime, endTime, votingEnabled } = req.body;
//         if (!title || !startTime || !endTime) {
//             return res.status(404).json({ success: false, message: "title,startTime,endTime either of them is missing" })
//         }
//         const startDate = new Date(startTime); //Because the student sends a string, but MongoDB stores Date objects.

//         const endDate = new Date(endTime);

//         //new Date(startTime) converts string → Date object.
//         // If the string is invalid, the Date object becomes Invalid Date, which internally is NaN.
//         // isNaN(startDate) checks if the conversion failed.

//         if (isNaN(startDate) || isNaN(endDate)) {
//             return res.status(400).json({ message: "Invalid Time" })
//         }

//         const eventCreationDB = await elections.create({
//             title: title,
//             startTime: startDate,
//             endTime: endDate,
//             votingEnabled: votingEnabled
//         });


//         return res.status(200).json({ success: true, message: "Event saved successfully",event:eventCreationDB })

//     }
//     catch (error) {
//         console.log("this is the error", error);
//         res.status(500).json({
//             success: false,
//             message: "Internal server error at voteEvent"
//         })

//     }
// }

<<<<<<< HEAD
module.exports = { castevote, voteStatus, voteevents, checkVote, voteResult,winner }
=======
module.exports = { castevote, voteStatus, voteevents,checkVote }
>>>>>>> b7303b3509789b5b10b88e70611d3bb3e4c60368


