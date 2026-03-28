const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('./../jwtAuthMid');
const jwt = require('jsonwebtoken')
const {registerUser,loginUser,profileView,passChange,handleRefreshToken}=require('../controller/auth.controller')
const {loginLimiter,registerLimiter}=require('../middleware/rateLimiter')

//----post method to add login credentials-----
router.post('/signup',registerLimiter,registerUser);

//--------post route for login---------------
router.post('/login',jwtAuthMiddleware,loginLimiter,loginUser)

//------------profile route--------------------
router.get('/profile', jwtAuthMiddleware,profileView)

// ------------password changing route----------
router.put('/profile/password', jwtAuthMiddleware,passChange)

//-----------refresh token-----------------
router.post('/refreshtoken',handleRefreshToken)

module.exports = router;