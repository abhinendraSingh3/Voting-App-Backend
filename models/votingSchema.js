//this schema defines the title of the event happening,the start time and the end time and is voting active?

const mongoose=require('mongoose')
const { schema } = require('./candidate')

const votingSchema=new mongoose.Schema({
    title:String,
    startTime:Date,
    endTime:Date,
    votingEnabled:{
        type:Boolean,
        default:true
    }
})

module.exports=mongoose.model('votingSch',votingSchema)