// This file handles when a user connects and disconnects from your app
const resultEvents=require('./resultEvent');


function socketHandler(io){
    try{
    io.on('connection',(socket)=>{
        console.log("user connectedd",socket.id);

        //load events
        resultEvents(io,socket);

        socket.on('disconnected',()=>{
            console.log("user disconnected",socket.id)
        })
        
    })
}
catch(error){
    return console.log("socketHandler error==> ", error);
    
}
}

module.exports=socketHandler;