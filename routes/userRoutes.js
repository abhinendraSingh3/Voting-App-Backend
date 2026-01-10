const express= require('express');
const router= express.Router();
const userSchema=require('./../models/user')

//post method to add login credentials
router.post('/signup',async(req,res)=>{

const userData=req.body;// assuming the requestbody contains the user data

//creating new user document using the mongoose model
const createU=new userSchema(userData);




})