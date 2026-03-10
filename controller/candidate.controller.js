const express = require('express');
const candidateSch = require('./../models/candidate')
const router = express.Router();
const jwtAuthMiddleware = require('./../jwtAuthMid')
const userSchema = require('./../models/user')

// getAllCandidates()->list all candidates
const candidateView=async(req,res)=>{
    try{
    const userId=req.data.userId;

    const allCandidateData=await candidateSch.find().select("-votes -voteCount")
    if(!allCandidateData){
        return res.status(404).json({
            success:false,
            message:"No candidate Found"
        })
    }
    return res.status(200).json({success:true,
        data:allCandidateData,
        message:"Candidate data fetched successfully"
    })
    }
    catch(err){
        return res.status(500).json(
            console.log("error is ->",err),
            {success:false,
            message:"Internal Server error"
        })
    }
}


// getCandidateById()     // single candidate detail

// addCandidate()         // admin only
// updateCandidate()      // admin only
// deleteCandidate()      // admin only
// getVoteCount()         // live vote tally