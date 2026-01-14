const express=require('express')
const app= express();
//require('dotenv').config();
const userSch=require('./models/user')
const candidateSch=require('./models/candidate')
const userRoutes=require('./routes/userRoutes')
const db= require('./db');


const bodyparser=require('body-parser')
app.use(bodyparser.json()); //used for reading data from body

const PORT=process.env.PORT || 3000;// used for recieving dynamic port set for cloud platform and if not then use default port 3000



//use the routers
app.use('/user',userRoutes);


//use for publishing port
app.listen(PORT ,()=>{
    console.log(`Server running at port http://localhost:${PORT}`)
}) 