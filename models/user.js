const mongoose=require('mongoose');

//define user schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,'Name must be atleast 3 characters long'],
        maxLength:[50,'Name cannot exceed 50 characters']
    },
     age:{
        type:Number,
        min:[19,'Age must be greater than 18'],
        require:true
     },
    email:{
        type:String,
        unique:true 
    },
    mobile:{
        type:String,
        required:true
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
    },
    votedFor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'candidateSch',
        default:null
    }

});

//export
//👉 Schemas define rules
//👉Model interact with the database
module.exports=mongoose.model('userSch',userSchema);