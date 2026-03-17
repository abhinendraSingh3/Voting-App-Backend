    const mongoose= require('mongoose');
    require("dotenv").config();


    //define mongoose url
    const mongoUrl=process.env.MONGODB_URL_LOCAL; //this is defining mongodb default database

    //setup mongodb connection. this is mandatory default step
    mongoose.connect(mongoUrl)
    .then(()=>console.log("mongo connect"))
    .catch(err=>console.log(err))

    //mongoose maintains a default connection object representing the MongoDB connection
    const db=mongoose.connection;

    //event listeners to get an idea what is going on with the connection
    db.on('connected',()=>{
        console.log('Connection to mongoDb server successfully');
        
    });
    db.on('disconnected',()=>{
        console.log("connection to mongoDb server disconnected");
        
    });
    db.on('error',(err)=>{
        console.log("there is error occured",err);
        
    });

    //final step
    //export this file to database server

    module.exports=db;