//this schema defines the title of the event happening,the start time and the end time and is voting active?

const mongoose=require('mongoose')
const { schema } = require('./candidate')

const electionSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:['pending','active','closed'],
        default:'pending'
    },
    startdate:{
        type:Date,
        required:true
    },
    enddate:{
        type:Date,
    },
    createdat:{
        
        type:Date,
        default:Date.now
    }

})

// 2026-03-14  → date
// T           → separator
// 10:30:00    → time
// Z           → UTC timezone

module.exports=mongoose.model('electionSch',electionSchema)
