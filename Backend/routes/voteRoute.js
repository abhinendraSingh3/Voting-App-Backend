const express=require('express')
const router=express.Router();
const jwtAuthMiddleware = require('./../middleware/auth.middleware')
const authorizedRole=require('./../middleware/rbac.middleware')
const {voteStatus,castevote,eventCreate,voteevents}=require('./../controller/vote.contoller');
const {voteSubmitlimiter}=require('./../middleware/rateLimiter')


//---------------------voting------------------------------------------
// router.post('/castvote/:candidateId', jwtAuthMiddleware,voteSubmitlimiter,castevote )

// //-----------------voteStatus---------------
router.get('/myvotes',jwtAuthMiddleware,voteStatus);

//-------------------voting Events
router.get('/voteevents',jwtAuthMiddleware,voteevents);

// //--------admin set the voting event-----
// router.post('/admin/event',jwtAuthMiddleware,authorizedRole("admin"),eventCreate)



module.exports=router;


