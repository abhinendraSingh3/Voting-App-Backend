const mongoose= require('mongoose');
const electionSch=require('./electionSchema')

// define candidate Schema
const candidateSchema=new mongoose.Schema({

candidateName:{
        type:String,
        required:true,
    },
manifesto:{     
    type:String,
    required:true

},
position:{
    type:String,
    required:true
},

department:{
    type:String,
    required:true
},
candidateyear:{
    type:Number,
    required:true
},

candidatemail:{
    type:String,
    unique:true,
    trim:true,
    lowercase:true
},

elections:{
    type:mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
    ref:'electionSch',
=======
    ref:electionSch,
>>>>>>> b7303b3509789b5b10b88e70611d3bb3e4c60368
    required:true
},
votes:[
    {
        students:{
            type:mongoose.Schema.Types.ObjectId,//in order to obtain object ID because it's in the database and MongoDB understands database, so we do provide the location like mongoos.schema.types.objectID. then mongoose ask object id of what? then we give ref:user.S
            ref:'studentSch',
            required:true
        },
        votedAt:{    
            type:Date,     
<<<<<<< HEAD
            default:Date.now
=======
            default:Date.now()
>>>>>>> b7303b3509789b5b10b88e70611d3bb3e4c60368
        }
    }
],
voteCount:{
    type:Number,
    default:0
}

});

module.exports=mongoose.model('candidateSch',candidateSchema)