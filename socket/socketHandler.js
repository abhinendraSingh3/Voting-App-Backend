// This file handles when a user connects and disconnects from your app

const resultEventvents=require('./resultEvent');

module.exports=(io)=>{
    io.on('connection',(socket)=>{
        console.log('user Connected',socket.id);

        //load all events
        resultEventvents(socket,io)
    })
    socket.io('disconneted',()=>{
        console.log("user disconnected",socket.id)
    })
}

module.exports={socketHandler,getIO};
