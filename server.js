const express=require('express')
const app= express();
//require('dotenv').config();
const userSch=require('./models/user')
const candidateSch=require('./models/candidate')
const db= require('./db');


const bodyparser=require('body-parser')
app.use(bodyparser.json()); //used for reading data from body

const PORT=process.env.PORT || 3000;// used for recieving dynamic port set for cloud platform and if not then use default port 3000

app.get('/',(req,res)=>{
    return res.status(200).json({
        success:true,
        message:"App started successfully"
    })
});

const userRoutes=require('./routes/userRoutes')
//use the routers
app.use('/user',userRoutes);

const candidateRoutes=require('./routes/candidateRoute')
app.use('/candidate',candidateRoutes)

//use for publishing port
app.listen(PORT ,()=>{
    console.log(`Server running at port http://localhost:${PORT}`)
}) 