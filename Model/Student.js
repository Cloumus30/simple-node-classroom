const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"requiring Name"]
    },
    nisn:{
        type:Number,
        required:[true,"nisn Must be filled"],
    },
    status:{
        type:String,
        required:[true,"status must be filled"]
    },
    idClass:{
        type:String,
        required:true
    }
},{timestamps:true});

const Student = mongoose.model('student',studentSchema);

module.exports=Student;
