const express = require('express');
const router = express.Router();
const userSchema = require('./../models/user')
const bcrypt = require('bcrypt');

//post method to add login credentials
router.post('/signup', async (req, res) => {

    try {
        const { name, address, aadharNumber, password, role } = req.body;// assuming the requestbody contains the user data

        //check if the required field has been set or not
        if (!name || address || aadharNumber || password || role) {
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
        res.status(500).json({ error: "Internal Server Error" })

    }
})