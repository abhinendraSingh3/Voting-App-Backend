const mongoose=require('mongoose');

//define user schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
     age:{
        type:Number,
     },
    email:{
        type:String,
        
    },
    mobile:{
        type:String,
    },
    address:{
        type:String,
        required:true
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
        type:String, 
        required:true,
        enum:['voter','admin'],
        default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false
    }

});

//export
//👉 Schemas define rules
//👉Model interact with the database
module.exports=mongoose.model('userSch',userSchema);