const express = require('express');
const candidateSch = require('./../models/candidate')
const router = express.Router();
const jwtAuthMiddleware = require('./../jwtAuthMid')
const userSchema = require('./../models/user')

const checkAdminRole = async (userId) => {
    //check if the user has the admin role or not.
    try {
        const user = await userSchema.findById(userId)

        if (user.role == 'admin') {
            return true;
        }
        if (!user) {
            return false;

        }
        return false

    }
    catch (error) {
        console.log('error in adminRole-', error)

        return false

    }
}

//add new candidate
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        const adminuserId = req.data.userId //admin user id

        const candiId = req.params.id; //exracting the id from body
        const { candidateName, party, age, candidateId } = req.body;

        const isAdmin = await checkAdminRole(adminuserId);
        if (!isAdmin) {
            return res.status(401).json({ message: "Only admins are allowed to add candidates" })
        }
        const candidateData = req.body;// extracting user data from body


        // check the all the required fields are there

        if (!candidateName || !party || !age || !candidateId) {

            return res.status(401).json({ message: "Please fill all the required fields" })

        }

        const checkCandiate = await candidateSch.findById(candiId);
        if (checkCandiate) {
            return res.status(201).json({ message: "user already existed" })
        }

        const createCandidate = new candidateSch({
            ...req.body
        })
        //save data to db
        const response = await createCandidate.save()
        console.log("Datasaved")
        res.status(201).json({ message: "New candidate Saved" })
    }

    catch (error) {
        res.status(500).json({
            error: error.message,
            message: "internal server error"
        })

    }

})

//-----------------------------upadate candidate---------------------------------
router.put('/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {

        const candidateId = req.params.candidateId //getting from candidate id from url\


        const userId = req.data.userId// admin user id from jwtauthmiddleware

        const isAdmin = await checkAdminRole(userId);
        if (!isAdmin) {
            return res.status(403).json({ message: "Only admins are allowed to update" })
        }

        const bData = req.body;


        //finding if the candidate exists
        const findCandidate = await candidateSch.findOne({ candidateId: candidateId });//findone used here because candidateid is custom field in db
        console.log('herer is the value')

        if (!findCandidate) {
            return res.status(404).json({ message: "User not found" })
        }

        //updating the data
        const updateData = await candidateSch.findOneAndUpdate({ candidateId: candidateId }, bData, {
            new: true,
            runValidators: true
        })

        console.log("data saved");

        return res.status(201).json({
            message: "Data Saved",
            data: updateData
        })
    }

    catch (error) {
        console.log("catch Error:", error)
        return res.status(501).json({ message: "Internal Server Error" })
    }


})


//-------------delete candidate------------------------
router.delete('/:candidateid', jwtAuthMiddleware, async (req, res) => {
    try {
        //extrating the ids from body and jwtmiddleware
        const adminId = req.data.userId;
        const candidateId = req.params.candidateid;

        //checking if the user is admin
        const isAdmin = await checkAdminRole(adminId);
        if (!isAdmin) {
            return res.status(401).json({ message: "User has to be admin to perform changes" })
        }

        //checking if the candidate is present in the db
        const userCheck = await candidateSch.findOne({ candidateId: candidateId });
        if (!userCheck) {
            return res.status(401).json({ message: "User doesn't exist" })
        }

        //deleting the data existing data
        const dataDelete = await candidateSch.findOneAndDelete({ candidateId: candidateId })
        if (!dataDelete) {
            return res.status(404).json({ message: "Data Not deleted" })
        }

        return res.status(200).json({ message: "Data deleted successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server error" })
    }
})


//---------------------voting------------------------------------------
router.post('/vote/:candidateId', jwtAuthMiddleware, async (req, res) => {
    //no admin can vote
    //only user can vote only once
    try {

        const candidateId = req.params.candidateId// extract id from url
        const userId = req.data.userId; //extract userI from authmiddleware 


        //find the candidate document with specific candidateid
        const candidateF = await candidateSch.findOne({ candidateId: candidateId })

        if (!candidateF) {
            return res.status(401).json({ message: "cannot find the candidate" })
        }
        

        const userF = await userSchema.findById(userId);
        
        if (!userF) {
            return res.status(401).json({ message: "cannot find the user" })
        }
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

        return res.status(200).json({ message: "Votes added successfully" })

    }
    catch (error) {

        return res.status(500).json({ message: "Internal server error" })
    }
})

//------------voteCount-------------
router.get('/:candidateId', jwtAuthMiddleware, async (req, res) => {
    try {
        const candidateId = req.params.candidateId;

        const candidateF = candidateSch.findOne({ candidateId: candidateId })

        if (!candidateF) {
            return res.status(401).json({ message: "candidate not found" })
        }



    }
    catch (error) {
        return res.status(501).json({ message: "Internal server error" })
    }

})



module.exports = router