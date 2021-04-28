const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:String,
    nisn:Number,
    status:String,
    idClass:{
        type:String,
        required:true
    }
},{timestamps:true});

const Student = mongoose.model('student',studentSchema);

module.exports=Student;
