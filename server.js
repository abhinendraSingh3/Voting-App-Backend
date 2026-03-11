const express=require('express')
const app= express();
const userSch=require('./models/user')
const candidateSch=require('./models/candidate')
const db= require('./db');
const http=require('http');
const cors=require('cors')

app.use(bodyparser.json()); //used for reading data from body
app.use(cors());

//http server create
const server=http.createServer(app)

const bodyparser=require('body-parser')


const PORT=process.env.PORT || 3000;// used for recieving dynamic port set for cloud platform and if not then use default port 3000

app.get('/',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"App started successfully"
    })
});



//use for publishing port
app.listen(PORT ,()=>{
    console.log(`Server running at port http://localhost:${PORT}`)
}) 