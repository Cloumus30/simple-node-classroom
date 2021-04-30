const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Nama Harus Diisi"]
    },
    nisn:{
        type:Number,
        required:[true,"NISN Harus Diisi"],
    },
    status:{
        type:String,
        required:[true,"Status Harus Diisi"]
    },
    idClass:{
        type:String,
        required:true
    }
},{timestamps:true});

const Student = mongoose.model('student',studentSchema);

module.exports=Student;
