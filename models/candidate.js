const mongoose= require('mongoose')

// define candidate Schema
const candidateSchema=new mongoose.Schema({

Candidate_Name:{
        type:String,
        required:true
    },
party:{
    type:String,
    required:true

},
age:{
    type:Number,
    required:true
},
candidateId:{
    type:Number,
    required:true,
    unique:true
},
votes:[
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,//in order to obtain object ID because it's in the database and MongoDB understands database, so we do provide the location like mongoos.schema.types.objectID. then mongoose ask object id of what? then we give ref:user.S
            ref:'User',
            required:true
        },
        votedAt:{
            type:Date,
            default:Date.now()
        }
    }
],
voteCount:{
    type:Number,
    default:0
}




});

module.exports=mongoose.model('candidateSch',candidateSchema)