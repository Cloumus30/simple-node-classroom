const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    className:{
        type:String,
        required:[true,'Kelas harus Diisi']
    },
    lesson:{
        type:String,
        required:[true,'Mata Pelajaran Harus Diisi']
    },
    teacher:{
        type:String,
        required:[true,'Nama Guru Harus Diisi']
    },
    studentsNum: {
        type:Number,
        required:[true,'Jumlah Murid Harus Diisi']
    },
},{timestamps:true});

const Class = mongoose.model('class',ClassSchema);

module.exports=Class;