
const authorizedRole=(role)=>{
    return(req,res,next)=>{
        try{
        if(!role.include(req.data.userRole)){
            return res.status(401).json({message:"Invalid access"})
        }
        next();

    }
    catch(err){
      return res.status(500).json(
        console.log("error Messgae->",err),
        {success:false, message:"Internal server error at authorise role"})  
    }
}

}