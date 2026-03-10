<<<<<<< Updated upstream
=======
// // What functions go inside:
// register()      // new user signup
// login()         // login + return JWT token
// getProfile()    // get logged in user's profile
// changePassword() // update password

>>>>>>> Stashed changes
const express = require('express');
const userSchema = require('./../models/user')
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwtAuthMiddleware = require('../middleware/auth.middleware');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {
        const { name, address, aadharNumber, password, role } = req.body;// assuming the requestbody contains the user data

        //check if the required field has been set or not
        if (!(name || address || aadharNumber || password || role)) {
            return res.status(400).json({
                message: "All fields are required"

            })
        }

        //check if the admin role is present or not
        const checkAdmin = await userSchema.find({ role: "admin" })
        if (checkAdmin.length > 0) {
            return res.status(401).json({ message: "only one admin is allowed and that is already present" })
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
        console.log(res.json(response))
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


}

const loginUser=async(req,res)=>{
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
        // generate jwt payload because its necessary to send token after the user has been verified
        const payload = {
            userId: validUser._id,
            userRole:validUser.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        //login success
        res.status(200).send({
            message: "login successful",
            token: token
        })
    }
    catch (error) {
        console.log("LOGIN ERROR =>", error);
        res.status(500).send({

            message: "Server error"
        });
    }
}

const profileView=async(req,res)=>{

    try {
        console.log('profile call')
        const userPData = req.data; //extracting user data from jwt token
        console.log(userPData, 'userPdata')
        const userId = userPData.userId;// "userId" is the format in which jwt sends response

        const userFound = await userSchema.findById(userId);
        if (!userFound) {
            res.status(401).json({ message: "Internal server error" })
        }
        res.status(200).json({ userFound })
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: "Internal server error" })

    }

}
const passChange=

const changePass=async(req,res)=>{
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
}

module.exports={registerUser,changePass,profileView,loginUser};


