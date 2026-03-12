const db= require('./db');
const express=require('express')
const http=require('http'); 
const cors=require('cors');
const socket=require('socket.io');
const socketHandler=require('./socket/socketHandler')
const app= express();

app.use(bodyparser.json()); //used for reading data from body
app.use(cors());

//http server create
const server=http.createServer(app)
const io=socket(server,{cors:{origin:'*'}})

//initialize socketHandler
socketHandler(io)

const bodyparser=require('body-parser');
const { Socket } = require('socket.io');


const PORT=process.env.PORT || 3000;// used for recieving dynamic port set for cloud platform and if not then use default port 3000

db();
app.get('/',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"App started successfully"
    })
});

//use for publishing port
server.listen(PORT ,()=>{
    console.log(`Server running at port http://localhost:${PORT}`)
}) 