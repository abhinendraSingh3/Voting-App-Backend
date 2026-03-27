const mongoose = require('mongoose');

//define user schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Name must be atleast 3 characters long'],
        maxLength: [50, 'Name cannot exceed 50 characters']
    },

    email: {
        type: String,
        unique: true,
        lowercase:true,
        trim:true,
        required:true
    },
      studentid: {
        type: Number,
        require: true
    },

    department: {
        type: String,
        required: true,
        enum:['btech','mca','mba','bca','bba'],
        lowercase:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'student'],
        default: 'student'
    },

    // isVoted: {
    //     type: Boolean,
    //     default: false
    // },
    // votedFor: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'candidateSch',
    //     default: null
    // }
});

//export
//👉 Schemas define rules
//👉Model interact with the database
module.exports = mongoose.model('studentSch', studentSchema);
