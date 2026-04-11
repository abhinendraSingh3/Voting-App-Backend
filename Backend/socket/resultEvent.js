const candidateModel=require('./../models/candidate');
const studentSch=require('./../models/studentSchema');

function resultEvent(socket,io){
    //io.emit means broadcast to each person
    //socket.emit means boradcast to that particular person
    //io.on-recieves messages from all
    //socket.on- recieve message from that particular person

    //recive data from body
    //check if the user have voted or not in db
        //if voted then dont allow him
        //else-update db, broadcast that message to all using io.emit


    socket.on('voteCast',async (data)=>{
        try{
        const {userId,candidatName,party}=data;

        const user=await studentSch.findOne({_id:userId})
        //check if user is valid or not
        if(!user){
            socket.emit('voteError',"user not found");
            return
        }
        //check if user have already casted voted
        if(user.isVoted){
            socket.emit("alreadyVoted","user have already voted");
            return;
        }
        //update user
        await studentSch.findOneAndUpdate({_id:userId},{isVoted:true})
        //update candidate vote
        const updateCandidateDb=await candidateModel.findOneAndUpdate(
            {candidateName:candidatName,party:party},
            {$inc:{voteCount:1}},
            {new:true}
        )

        io.emit('voteResult',updateCandidateDb)
        console.log("user has voted and published result to all candidates")
    }
    catch(error){
        console.log("this is the error ===>",err)
    }
    })
}
module.exports=resultEvent