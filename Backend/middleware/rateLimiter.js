const rateLimiter=require('express-rate-limit')

//globalLimiter
const globalLimiter=rateLimiter({
    windowMs:15*60*60,
    max:100,
    message:"Too many attempts please try again in 15mins",
    
})

//login limiter
const loginLimiter=ratelimiter({
    windowMs:1*60*60,
    max:5,
    message:"Too many attempts please try again in 1mins"

})

//registerLimiter
const registerLimiter=ratelimiter({
    windowMs:1*60*60,
    max:3,
    message:"Too many attempts please try again in 1mins"

})
//votelimiter
const voteSubmitlimiter=ratelimiter({
    windowMs:1*60*60,
    max:5,
    message:"Too many attempts please try again in 1mins",
    keyGenerator:(req)=>{return req.data.userId} //we are using custom rate limiting identification as userId which comes from auth

})

//createCandidateLmiter
const createCandidtaLimiter=ratelimiter({
    windowMs:1*60*60,
    max:2,
    message:"Too many attempts please try again in 1mins",
    keyGenerator:(req)=>{return req.data.userId}//we are using custom rate limiting identification as userId which comes from auth

})
module.exports={createCandidtaLimiter,voteSubmitlimiter,registerLimiter,loginLimiter,globalLimiter}

