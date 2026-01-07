const mongoose=require('mongoose');

//define person schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     age:{
        type:Number,
     },
    email:{
        type:strinbg,
        
    },
    mobile:{
        type:String,
        
    },
    address:{
        type:String,
        require:true
    },

    aadharNumber:{
        type:Number,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    },
    role:{
        required:true,
        enum:['voter','admin'],
        default:'voter'
    },
    isVoted:{
        tyoe:Boolean,
        default:false
    }








});

//export
//👉 Schemas define rules
//👉Model interact with the database
module.exports=mongoose.model('user',userSchema);