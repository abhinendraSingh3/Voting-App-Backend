const mongoose=require('mongoose')

const voteSchema=new mongoose.Schema({

    //who vote
    voter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:studentSch,
        required:true
    },

    //whom votedd
    votedfor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:candidateSch,
        required:true
    },

    //which election
    election:{
        type:mongoose.Schema.Types.ObjectId,
        ref:electionSch,
        required:true
    },
    //when voted,
    votedat:{
        type:Date,
        default:Date.now

    }

  
})
  //validation for 1 user 1 vote for election-Use a compound unique index on voter and election fields.
    voteSchema.index({voter:1,election:1},{unique:true})


module.exports=mongoose.model('voteSch',voteSchema);