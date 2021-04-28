const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    className:String,
    lesson:String,
    teacher:String,
    studentsNum: Number,
},{timestamps:true});

const Class = mongoose.model('class',ClassSchema);

module.exports=Class;