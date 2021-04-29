const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    className:{
        type:String,
        required:[true,'Class must be filled']
    },
    lesson:{
        type:String,
        required:[true,'Lesson must be filled']
    },
    teacher:{
        type:String,
        required:[true,'Teacher must be filled']
    },
    studentsNum: {
        type:Number,
        required:[true,'Student Number must be filled']
    },
},{timestamps:true});

const Class = mongoose.model('class',ClassSchema);

module.exports=Class;