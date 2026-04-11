const express = require('express');
const candidateSch = require('./../models/candidate')
const router = express.Router();
const jwtAuthMiddleware = require('./../middleware/auth.middleware')
const userSchema = require('./../models/studentSchema')

// getAllCandidates()->list all candidates
const candidateView = async (req, res) => {
    try {
        const { electionId } = req.params;

        const allCandidateData = await candidateSch.find({ elections: electionId }).select("-votes -voteCount")

        if (!allCandidateData) {
            return res.status(404).json({
                success: false,
                message: "No candidate Found"
            })
        }

        return res.status(200).json({
            success: true,
            data: allCandidateData,
            message: "Candidate data fetched successfully"
        })
    }
    catch (err) {
        console.log("error is ->", err)
        return res.status(500).json(
            {
                success: false,
                message: "Internal Server error"
            })
    }
}


// addCandidate()         // admin only
// const addCandidate = async (req, res) => {
//     try {
//         const { candidateName, party, age } = req.body;

//         // check the all the required fields are there

//         if (!candidateName || !party || !age) {
//             return res.status(401).json({ message: "Please fill all the required fields" })
//         }

//         const checkCandiate = await candidateSch.findOne({ candidateName: candidateName, party: party, age: age });
//         if (checkCandiate) {
//             return res.status(201).json({ message: "Candiate already existed" })
//         }

//         const createCandidate = await candidateSch.create({
//             candidateName: candidateName,
//             party: party,
//             age: age
//         })

//         console.log("Datasaved")
//         return res.status(201).json({ success: true, data: createCandidate, message: "New candidate Saved" })
//     }

//     catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             message: "internal server error"
//         })

//     }
// }
// updateCandidate()      // admin only
// const updateCandidate = async (req, res) => {
//     try {

//         const candidateId = req.params.candidateId //getting from candidate id from url\

//         const { candidateName, party, age } = req.body;

//         if (!candidateName || !party || !age) {
//             return res.status(401).json({ message: "Please fill all the required fields" })
//         }

//         //finding if the candidate exists
//         const findCandidate = await candidateSch.findOne({ candidateId: candidateId });//findone used here because candidateid is custom field in db

//         if (!findCandidate) {
//             return res.status(404).json({ message: "User not found" })
//         }

//         //updating the data
//         const updateData = await candidateSch.findOneAndUpdate({ candidateId: candidateId }, { candidateName: candidateName, party: party, age: age }, {
//             new: true,
//             runValidators: true
//         })

//         console.log("data saved");

//         return res.status(201).json({
//             data: updateData,
//             success: true,
//             message: "Data Saved",

//         })
//     }

//     catch (error) {
//         console.log("catch Error:", error)
//         return res.status(501).json({ message: "Internal Server Error" })
//     }

// }


// deleteCandidate()      // admin only
// const deleteCandidate = async (req, res) => {
//     try {
//         const candidateId = req.params.candidateid

//         //checking if the candidate is present in the db
//         const candidateCheck = await candidateSch.findOne({ _id: candidateId });
//         if (!candidateCheck) {
//             return res.status(401).json({ success: false, message: "User doesn't exist" })
//         }

//         //deleting the existing data
//         const dataDelete = await candidateSch.findOneAndDelete({ _id: candidateId })
//         if (!dataDelete) {
//             return res.status(404).json({ success: false, message: "Data Not deleted" })
//         }

//         return res.status(200).json({ success: true, message: "Data deleted successfully" })
//     }
//     catch (err) {
//         console.log("error-->", err)
//         return res.status(500).json({ success: false, message: "Internal Server error" })
//     }
// }

// getVoteCount()         // live vote tally
const voteCount = async (req, res) => {
    try {
        //displaying all the votes 
        const candidate = await candidateSch.find().sort({ voteCount: 'desc' });

        //return only partyName and vote count
        const vRecord = await candidate.map((data) => ({
            party: data.party,
            count: data.voteCount
        }))
        return res.status(200).json({ vRecord })

    }
    catch (error) {
        return res.status(501).json({ message: "Internal server error" })
    }

}
module.exports = { voteCount, candidateView };  