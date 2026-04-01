
const candidateSch = require('./../models/candidate')
const studentSchema = require('./../models/studentSchema');
const student = require('./../models/studentSchema');
const elections = require('../models/electionSchema')
const voteSch=require('../models/voteSchema');

// castVote()       // student casts vote (checks isVoted first)
// getResults()     // get full results/leaderboard


//-------------voting Events display-------------
const voteevents=async(req,res)=>{
    try{
        
        const events=await elections.find();
        if(!events){
            return res.status(404).json({
                success:false,
                message:"No events going on"
            })
        }

        return res.status(200).json({
            success:true,
            data:events,
            message:"data fetched Successfully"
        })


    }catch(errr){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

}


// getVoteStatus()- Logged in student checks their own vote status:
const voteStatus = async (req, res) => {
    try {
        
        const studentid = req.data.userId;
        console.log("herer")

        console.log(studentid);
        const studentData = await student.findById(studentid);
        
        if (!studentData) {
            return res.status(404).json({
                success: false, message: 'student not found'
            });
        }

        // Check if student has voted 
        const voteCheck=await voteSch.findOne({voter:studentid}).populate([
            {path:'votedfor'},
            {path:'election'},
        ]);

        if(!voteCheck){
            return res.status(401).json({
                success:false,
                message:"no votes"
            })
        }
        // student has voted 
        return res.status(200).json({ success: true, data: voteCheck });
    }
    catch (error) {
        console.log("error is here");
        return res.status(500).json({ message: "Internal server error" })
    }
}

//-------------vote results-------------------
const votecounts=async()=>{
    try{

        //get vote count of each candidates
        const candidateVotes=await candidateSch.find().sort({voteCount:'desc'});

        if(!candidateVotes){
            return res.status(404).json({
                success:false,
                message:"No candidate found"
            })
        }
        const vrecord=await candidateVotes.map((data)=>({
            candidateName:data.candidateName,
            totalVotes:data.voteCount
        }))

        //compare by values whose vote count is higher that is winner
        //count second highest
        //count third highest
        //return the value of these three

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

//-----casteVote-------------------------
const castevote = async (req, res) => {
    //no admin can vote
    //only student can vote only once
    try {
        const studentid = req.data.studentid; //extract studentI from authmiddleware 

        const { candidateName, party } = req.body;
        if (!candidateName || !party) {
            return res.status(404).json({ success: false, message: "kindly fill candidateName and party name to vote" })
        }

        //find the candidate document with specific candidateid
        const candidateF = await candidateSch.findOne({ candidateName: candidateName, party: party })

        if (!candidateF) {
            return res.status(401).json({ message: "cannot find the candidate" })
        }

        const studentF = await studentSchema.findById(studentid);
        if (studentF.role == "admin") {
            return res.status(401).json({ message: "admins cannot vote " })
        }
        if (studentF.isVoted) {
            return res.status(401).json({ message: "You have already voted" })
        }

        //update the candidate voteList
        candidateF.votes.push({
            student: studentid
        })

        candidateF.voteCount++;
        await candidateF.save()

        //update the student Document
        studentF.isVoted = true;
        await studentF.save();

        return res.status(200).json({ success: true, message: "Vote added successfully" })

    }
    catch (error) {

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

module.exports = { castevote, voteStatus,voteevents }


