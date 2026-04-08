const express = require('express');
const router = express.Router();
const jwtAuthMiddleware = require('./../middleware/auth.middleware')

const {voteCount,deleteCandidate,updateCandidate,addCandidate,singleCandidate,candidateView} =require('./../controller/candidate.controller');
const{createCandidtaLimiter}=require('./../middleware/rateLimiter')


//add new candidat
// router.post('/', jwtAuthMiddleware,createCandidtaLimiter,authorizedRole("admin"),addCandidate);

//-----------------------------upadate candidate---------------------------------
// router.put('/:candidateId',jwtAuthMiddleware,authorizedRole("admin"),updateCandidate)


// //-------------delete candidate------------------------
// router.delete('/:candidateid', jwtAuthMiddleware,authorizedRole("admin"),deleteCandidate )


// //------------voteCount-------------
// router.get('/votecount', jwtAuthMiddleware,voteCount);

//show candidates according to 
router.get('/allcandidates/:electionId',jwtAuthMiddleware,candidateView);


module.exports = router