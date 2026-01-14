// server once log in user and then other req is made then it forgets everything and so in order to not again and again verify things with db it uses authmiddle to check the valid token
const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
    
    const authHeader=req.headers.authorization;
    console.log(authHeader);
    
    
    if(!authHeader){
        return res.status(401).json({message:"Token missing"})
    }

    // the header looks like this- Authorizartion:Bearer xzvsdg2312vsxvds.... so it order to extract only token we are splitting and taking only the value present at index 1.
    const token=authHeader.split(' ')[2];
    console.log('token', token)

    if(!token){
        return res.status(401).json({message:'unauthorised'})
    }
    try{
        console.log(token, 'token');
        console.log('env', process.env.JWT_SECRET);
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET);// verify if the token is valid or not
        req.data=decoded;// attach user data
        next();//go to next


    }
    catch(error){
        res.status(401).json({message:"Invalid token"})
    }
};

module.exports=jwtAuthMiddleware;