const express = require('express');
const candidateSch = require('./../models/candidate')
const router = express.Router();
const jwtAuthMiddleware = require('./../middleware/auth.middleware')
const userSchema = require('./../models/user');
const user = require('./../models/user');
const eventSch = require('../models/eventSchema')

// castVote()       // user casts vote (checks isVoted first)
// getResults()     // get full results/leaderboard

const castevote = async (req, res) => {
    //no admin can vote
    //only user can vote only once
    try {
        const userId = req.data.userId; //extract userI from authmiddleware 

        const { candidateName, party } = req.body;
        if (!candidateName || !party) {
            return res.status(404).json({ success: false, message: "kindly fill candidateName and party name to vote" })
        }

        //find the candidate document with specific candidateid
        const candidateF = await candidateSch.findOne({ candidateName: candidateName, party: party })

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

        return res.status(200).json({ success: true, message: "Vote added successfully" })

    }
    catch (error) {

        return res.status(500).json({ message: "Internal server error" })
    }
}

// getVoteStatus()- Logged in user checks their own vote status:
const voteStatus = async (req, res) => {
    try {
        const userId = req.data.userId;
        const userData = await user.findById(userId).populate('votedFor', 'candidateName party')

        if (!userData) {
            return res.status(404).json({
                success: false, message: 'User not found'
            });
        }

        // Check if user has voted 
        if (!userData.votedFor) { return res.status(200).json({ success: true, message: 'User has not voted yet', data: userData }); }

        // User has voted 
        return res.status(200).json({ success: true, data: userData });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}


const createEvent = async (req, res) => {
    try {
        //extract valid data from body
        const { title, startTime, endTime, votingEnabled } = req.body;
        if (!title || !startTime || !endTime) {
            return res.status(404).json({ success: false, message: "title,startTime,endTime either of them is missing" })
        }
        const startDate = new Date(startTime); //Because the user sends a string, but MongoDB stores Date objects.

        const endDate = new Date(endTime);

        //new Date(startTime) converts string → Date object.
        // If the string is invalid, the Date object becomes Invalid Date, which internally is NaN.
        // isNaN(startDate) checks if the conversion failed.

        if (isNaN(startDate) || isNaN(endDate)) {
            return res.status(400).json({ message: "Invalid Time" })
        }

        const eventCreationDB = await eventSch.create({
            title: title,
            startTime: startDate,
            endTime: endDate,
            votingEnabled: votingEnabled
        });
        

        return res.status(200).json({ success: true, message: "Event saved successfully",event:eventCreationDB })

    }
    catch (error) {
        console.log("this is the error", error);
        res.status(500).json({
            success: false,
            message: "Internal server error at voteEvent"
        })

    }
}

module.exports = { castevote, voteStatus }


