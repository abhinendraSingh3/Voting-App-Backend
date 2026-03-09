const express = require('express');
const router = express.Router();
const userSchema = require('./../models/user')
const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');
require('dotenv').config();
const jwtAuthMiddleware = require('./../jwtAuthMid');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

//----post method to add login credentials-----
router.post('/signup', async (req, res) => {
});


//--------post route for login---------------
router.post('/login', async (req, res) => {

})

//------------profile route--------------------
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    
})

// ------------password changing route----------
router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        //we are extracting user data after it has verified in the jwt
        const userdata = req.data;
        const userId = userdata.id;// here we are extracting id

        const { currentPassword, newPassword } = req.body;

        //finding user by userId in db
        const userFound = await userSchema.findById(userId);
        if (!userFound) {
            console.log(error)
            return res.status(400).send({
                message: 'User Not found'
            });
        }
        //comparing the existing password of the user is correct or not 
        const isMatch = await bcrypt.compare(currentPassword, userFound.password)
        if (!isMatch) {
            return res.status(400).send({
                message: 'current password is Incorrect'
            });
        }
        //user password save
        userId.password = newPassword;
        await userFound.save()
        console.log("password updated")
        res.status(200).json({ message: "Password Updated" });
    }
    catch (error) {
        console.log(err);
        res.status(401).json({
            error: "internal server error"
        })
    }
})

module.exports = router; 