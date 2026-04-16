const express = require('express');
const studentSch = require('./../models/studentSchema')
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwtAuthMiddleware = require('../middleware/auth.middleware');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {

        const { name, email, studentid, department, password } = req.body;// assuming the requestbody contains the user data
        console.log(name, email, studentid, department, password)

        //check if the required field has been set or not
        if (!name || !email || !studentid || !password || !department) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"

            })
        }

        //check if the admin role is present or not
        // const checkAdmin = await studentSch.find({ role: "admin" })
        // if (checkAdmin.length > 0) {
        //     return res.status(401).json({ message: "only one admin is allowed and that is already present" })
        // }

        //checking if the user already existed or not
        const checkUser = await studentSch.findOne({ email })
        if (checkUser) {
            return res.status(400).json({
                success: false,
                message: "User already existed"
            });


        }

        //storing password using bcrypt
        const saltRounds = 10;
        //hashpass
        const hassPass = await bcrypt.hash(password, saltRounds);

        //creating new user document using the mongoose model
        const createU = new studentSch({
            name,
            email,
            studentid,
            department,
            password: hassPass // overRides plain password
        });

        // save the data to db
        const resp = await createU.save();
        console.log("data saved in db");

        res.status(201).json({
            data: resp,
            success: true,
            message: 'User Registered Successfuly'
        })

        //if something broke then.
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
            message: "internal server error"
        })
    }
}

//-----login route---------
const loginUser = async (req, res) => {  
    try {

        const { email, password } = req.body;
        
        const validUser = await studentSch.findOne({ email });
        
        if (!validUser) {
            return res.status(400).send({
                success: false,
                message: "Email is incorrect or user has not signed up"
            })
        }
        const isMatch = await bcrypt.compare(password, validUser.password)

        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: 'password is Incorrect'
            });
        }
        // generate jwt payload because its necessary to send token after the user has been verified
        const payload = {
            userId: validUser._id,
            name: validUser.name
        }

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });

        //generating refresh token if the access token is expired then we can use refresh token to generate new access token without asking user to login again
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
            expiresIn: '7d'
        });

        //sendding refreshToken to cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true, //secure: true  → cookie only sent over HTTPS
                            //secure: false → cookie sent over HTTP too
            secure: false,
            sameSite: "lax",//lax: relaxed, same domain different ports ok
            domain:'localhost',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        //login success
        res.status(200).send({
            success: true,
            message: "login successful",
            accessToken: accessToken,
            userData:{
                id: validUser._id,
                name:validUser.name,
                email:validUser.email
            }
        })
        console.log(`user ${email} logged in successfully`);
    }
    catch (error) {
        console.log("LOGIN ERROR =>", error);
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
}


//handle refresh token
const handleRefreshToken = async (req, res) => {
    try {
        // get refresh token from cookie
        const refreshToken = req.cookies.refreshToken;
        console.log("no refresh")

        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token not found"
            });
        }

        // verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN
        );

        // generate new access token
        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        // send new access token
        res.json({ accessToken: newAccessToken });

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: "Invalid or expired refresh token"
        });
    }
}

const profileView = async (req, res) => {

    try {
        console.log('profile call')
        const userPData = req.data; //extracting user data from jwt token
        console.log(userPData, 'userPdata')
        const userId = userPData.userId;// "userId" is the format in which jwt sends resp

        const userFound = await studentSch.findById(userId);
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
const passChange = async (req, res) => {
    try {
        //we are extracting user data after it has verified in the jwt
        const userdata = req.data;
        const userId = userdata.id;// here we are extracting id

        const { currentPassword, newPassword } = req.body;

        //finding user by userId in db
        const userFound = await studentSch.findById(userId);
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

module.exports = { registerUser, profileView, loginUser ,handleRefreshToken,passChange};


