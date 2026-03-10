const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('./../jwtAuthMid')
const authorizedRole=require('./../middleware/rbac.middleware')

const {voteCount,deleteCandidate,updateCandidate,addCandidate,singleCandidate,candidateView} =require('./../controller/vote.contoller')


//add new candidate
router.post('/', jwtAuthMiddleware,authorizedRole(admin),addCandidate);

//-----------------------------upadate candidate---------------------------------
router.put('/:candidateId',jwtAuthMiddleware,authorizedRole(admin),updateCandidate)


//-------------delete candidate------------------------
router.delete('/:candidateid', jwtAuthMiddleware,authorizedRole(admin),deleteCandidate )


//------------voteCount-------------
router.get('/votecount', jwtAuthMiddleware,voteCount);


module.exports = router