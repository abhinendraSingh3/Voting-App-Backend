//this schema defines the title of the event happening,the start time and the end time and is voting active?

const mongoose=require('mongoose')
const { schema } = require('./candidate')

const eventSchema=new mongoose.Schema({
    title:String,
    startTime:{
        type:Date,
        required:true
    },//YYYY-MM-DDTHH:mm:ssZ
    endTime:{
        type:Date,
        required:true
    }, //YYYY-MM-DDTHH:mm:ssZ
    votingEnabled:{
        type:Boolean,
        default:true
    }
})

// 2026-03-14  → date
// T           → separator
// 10:30:00    → time
// Z           → UTC timezone

module.exports=mongoose.model('eventSch',eventSchema)