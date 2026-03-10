const express=require('express')
const router=express.Router();
const jwtAuthMiddleware = require('./../middleware/auth.middleware')
const authorizedRole=require('./../middleware/rbac.middleware')
const {voteStatus,castevote}=require('./../controller/vote.contoller');

//---------------------voting------------------------------------------
router.post('/castvote/:candidateId', jwtAuthMiddleware,castevote )

//-----------------voteStatus---------------

router.get('/status',jwtAuthMiddleware)

module.exports=router;


