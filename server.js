const express=require('express')
const app= express();
//require('dotenv').config();
const bodyparser=require('body-parser')
const userSch=require('./models/user')
const candidateSch=require('./models/candidate')

app.use(bodyparser.json()); //used for reading data from body

const PORT=process.env.Port || 3000;// used for recieving dynamic port set for cloud platform and if not then use default port 3000

app.use('/',(req, res)=>{
    res.send('hello its working')
})


//use for publishing port
app.listen(PORT ,()=>{
    console.log(`Server running at port http://localhost:${PORT}`)
})