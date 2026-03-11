// initialize Socket.IO, handle connections, and export the io instance so controllers (like voteController) can emit events


const {Server}=require('socket.io');
const {registerSocketEvents}=require('./event');

let io;
const initializeSocket=(server)=>{

    io=new Server(server,{cors:{origin:"*"}});

    io.on('connection',(socket)=>{
        console.log("user connected",socket.id);
        registerSocketEvents(socket,io);

        socket.on('diconnected',()=>{
            console.log('user disconnected:',socket.id);
        })
        
    })
}

const getIO=()=>{
    if(!io){
        throw new Error("socket.io not initialized");
    }
    return io;
}

module.exports={initializeSocket,getIO};
