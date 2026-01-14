const express = require('express');
const router = express.Router();
const userSchema = require('./../models/user')
const bcrypt = require('bcrypt');
const { Schema } = require('mongoose');
require('dotenv').config();
const jwtAuthMiddleware = require('./../jwtAuthMid');
const bodyParser = require('body-parser');

//----post method to add login credentials-----
router.post('/signup', async (req, res) => {

    try {
        const { name, address, aadharNumber, password, role } = req.body;// assuming the requestbody contains the user data
        
        
        //check if the required field has been set or not
        if (!(name || address || aadharNumber || password || role)) {
            return res.status(400).json({
                message: "All fields are required"

            })
        }

        //checking if the user already existed or not
        const checkUser = await userSchema.findOne({ aadharNumber })
        if (checkUser) {
            return res.status(400).json({
                message: "User already existed"
            });
        }

        //storing password using bcrypt
        const saltRounds = 10;
        //hashpass
        const hassPass = await bcrypt.hash(password, saltRounds);

        //creating new user document using the mongoose model
        const createU = new userSchema({
            ...req.body, //takes all the field automaticall as ... is a spreadOperator.
            password: hassPass // overRides plain password
        });

        // save the data to db
        const response = await createU.save();
        console.log("data saved in db");
        res.status(201).json({
            message: 'User Registered Successfuly'
        })

        //if something broke then.
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            message: "internal server error"
        })

    }
});

//--------post route for login---------------
router.post('/login', async (req, res) => {
    try {
        const { aadharNumber, password } = req.body;


        const validUser = await userSchema.findOne({ aadharNumber });
        if (!validUser) {
            return res.status(400).send({
                message: "Aadhar Number is incorrect or user is not signed up"
            })
        }
        const isMatch = await bcrypt.compare(password, validUser.password)
        if (!isMatch) {
            return res.status(400).send({
                message: 'password is Incorrect'
            });
        }

        //login success
        res.status(200).send({
            message: "login successful"
        })

        // generate jwt payload because its necessary to send token after the user has been verified
        const payload = {
            userId:validUser.id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.send(token);


    }
    catch (error) {
        res.status(500).send({
            message: "Server error",
            error
        });
    }

})

//------------profile route--------------------
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userPData = req.data; //extracting user data from jwt token
        const userId = userPData.id;
        const userFound = await userSchema.findById(userId);
        if (!userFound) {
            res.status(401).json({ message: "Internal server error" })
        }
        res.status(200).json({ userFound })
    }
    catch (error) {
        console.log(err);
        res.status(401).json({ message: "Internal server error" })

    }
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
        res.status(200).json({message:"Password Updated"});
    }
    catch (error) {
        console.log(err);
        res.status(401).json({
            error: "internal server error"
        })
    }
})

module.exports=router; 