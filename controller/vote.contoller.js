const express = require('express');
const candidateSch = require('./../models/candidate')
const router = express.Router();
const jwtAuthMiddleware = require('./../middleware/auth.middleware')
const userSchema = require('./../models/user');
const user = require('./../models/user');

// castVote()       // user casts vote (checks isVoted first)
// getResults()     // get full results/leaderboard

const castevote = async (req, res) => {
    //no admin can vote
    //only user can vote only once
    try {
        const userId = req.data.userId; //extract userI from authmiddleware 

        const {candidateName,party}=req.body;
        if(!candidateName || !party){
            return res.status(404).json({success:false, message:"kindly fill candidateName and party name to vote"})
        }

        //find the candidate document with specific candidateid
        const candidateF = await candidateSch.findOne({ candidateName:candidateName, party:party })

        if (!candidateF) {
            return res.status(401).json({ message: "cannot find the candidate" })
        }

        const userF = await userSchema.findById(userId);
        if (userF.role == "admin") {
            return res.status(401).json({ message: "admins cannot vote " })
        }
        if (userF.isVoted) {
            return res.status(401).json({ message: "You have already voted" })
        }

        //update the candidate voteList
        candidateF.votes.push({
            user: userId
        })

        candidateF.voteCount++;
        await candidateF.save()

        //update the user Document
        userF.isVoted = true;
        await userF.save();

        return res.status(200).json({success:true, message: "Vote added successfully" })

    }
    catch (error) {

        return res.status(500).json({ message: "Internal server error" })
    }
}

// getVoteStatus()- Logged in user checks their own vote status:
const voteStatus=async(req,res)=>{
    try{
        const userId=req.data.userId;
        const userData=await user.findById(userId).populate('votedFor', 'candidateName party')

        if (!userData) { 
            return res.status(404).json({ success: false, message: 'User not found' 
            }); } 

        // Check if user has voted 
        if (!userData.votedFor) { return res.status(200).json({ success: true, message: 'User has not voted yet', data: userData }); }

        // User has voted 
        return res.status(200).json({ success: true, data: userData });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}

module.exports={castevote,voteStatus}


