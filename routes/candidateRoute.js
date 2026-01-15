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
router.post('/candidate', jwtAuthMiddleware, async (req, res) => {
    try {
        const adminuserId = req.body.userId //admin user id
        const candidateId=req.params.id; //exracting the id from body

        const isAdmin = await checkAdminRole(adminuserId);
        if (!isAdmin) {
            return res.status(401).json({ message: "Only admins are allowed to update" })
        }
        const candidateData = req.body;// extracting user data from body

        // check the all the required fields are there
        if (!Candidate_name || !party || !age || !candidateId) {
            return res.status(401).json({ message: "Please fill all the required fields" })
        }

        const checkCandiate = await candidateSch.findById(candidateId);
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

    catch(error) {
        res.status(500).json({
            error: error.message,
            message: "internal server error"
        })

    }

})

//upadate candidate
router.put('/:candidateId', jwtAuthMiddleware,async (req, res) => {
    try {

        const candidateId = req.params.candidateId // candidate id from body
        const userId = req.data.userId// admin user id from jwtauthmiddleware

        const isAdmin = await checkAdminRole(userId);
        if (!isAdmin) {
            return res.status(403).json({ message: "Only admins are allowed to update" })
        }

        const bData = req.body;

        //finding if the candidate exists
        const findCandidate = await candidateSch.findById(candidateId);
        if (!findCandidate) {
            return res.status(404).json({ message: "User not found" })
        }

        //updating the data
        const updateData = await candidateSch.findByIdAndUpdate(candidateId, bData, {
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
module.exports=routers