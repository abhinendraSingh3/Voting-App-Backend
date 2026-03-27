const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('./../middleware/auth.middleware');
const jwt = require('jsonwebtoken')
const {registerUser,loginUser,profileView}=require('../controller/auth.controller')
const {loginLimiter,registerLimiter}=require('../middleware/rateLimiter')

//----post method to add login credentials-----

router.post('/signup',registerLimiter,registerUser);

//--------post route for login---------------
router.post('/login',jwtAuthMiddleware,loginLimiter,loginUser)

//------------profile route--------------------
router.get('/profile', jwtAuthMiddleware,profileView)

// ------------password changing route----------
// router.put('/profile/password', jwtAuthMiddleware,changePass)

module.exports = router;