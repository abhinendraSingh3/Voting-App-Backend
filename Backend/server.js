const db= require('./config/db');
const express=require('express')
const http=require('http'); 
const cors=require('cors');
const socket=require('socket.io');
const socketHandler=require('./socket/socketHandler')
const app= express();
const bodyparser=require('body-parser');
const studentRoutes = require('./routes/studentRoutes');
const candidateRoutes = require('./routes/candidateRoute');
const voteRoutes = require('./routes/voteRoute');
const cookieParser=require('cookie-parser');
<<<<<<< HEAD
=======
const votingEvent =require('./routes/candidateRoute');

>>>>>>> b7303b3509789b5b10b88e70611d3bb3e4c60368

app.use(bodyparser.json()); //used for reading data from body
app.use(cors());
app.use(cookieParser());

//http server create
const server=http.createServer(app)
const io=socket(server,{cors:{origin:'*'}})

//initialize socketHandler
socketHandler(io)

const { Socket } = require('socket.io');


const PORT=process.env.PORT// used for recieving dynamic port set for cloud platform and if not then use default port 3000

app.get('/',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"App started successfully"
    })
});

app.use('/student', studentRoutes);
app.use('/candidate', candidateRoutes);
app.use('/vote', voteRoutes);
<<<<<<< HEAD
app.use('/votingEvents',candidateRoutes)
app.use('/result',voteRoutes)
=======
app.use('/votingEvents',votingEvent)
>>>>>>> b7303b3509789b5b10b88e70611d3bb3e4c60368

//use for publishing port
server.listen(PORT ,()=>{
    console.log(`Server running at port http://localhost:${PORT}`)
}) 