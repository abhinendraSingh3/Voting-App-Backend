const express=require('express');
const candidateSch=require('./../models/candidate')
const router=express.Router();
const jwtAuthMiddleware=require('./../jwtAuthMid')

router.get('/candidate',jwtAuthMiddleware,async(req,res)=>{




})