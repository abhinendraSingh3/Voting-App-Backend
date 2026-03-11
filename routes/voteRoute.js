const express=require('express')
const router=express.Router();
const jwtAuthMiddleware = require('./../middleware/auth.middleware')
const authorizedRole=require('./../middleware/rbac.middleware')
const {voteStatus,castevote}=require('./../controller/vote.contoller');
const {voteSubmitlimiter}=require('./../middleware/rateLimiter')

//---------------------voting------------------------------------------
router.post('/castvote/:candidateId', jwtAuthMiddleware,voteSubmitlimiter,castevote )

//-----------------voteStatus---------------
router.get('/status',jwtAuthMiddleware,voteStatus)

module.exports=router;


