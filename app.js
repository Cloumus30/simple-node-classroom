const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const objectId = require('mongodb').ObjectID;
const ClassObj = require('./Model/Class');
const Student = require('./Model/Student');

const con = 'mongodb://localhost:27017/newDB';
mongoose.connect(con,{useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        app.listen(port,()=>{
            console.log(`Listening to ${port}`);
        })
    })
    .catch((err)=>{
        console.log(err);
    });

app.set('view engine','ejs');
// app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
// override with POST having ?_method=
app.use(methodOverride('_method'))

app.get('/',async (req,res)=>{
    const classList = await ClassObj.find();
    // res.send(classList);
    res.render('profile',{title:'Home Page',classList});
});

app.get('/inputClass',async (req,res)=>{
    const classList = await ClassObj.find();
    res.render('inputClass',{title:'Input Class',classList})
});

app.get('/classPage/:id',async (req,res)=>{
    try{
        const id = req.params.id.trim();
        const classList = await ClassObj.find();
        const classDetail = await ClassObj.findById(id);
        const studentData = await Student.find({idClass:id});
        res.render('classPage',{title:'Class',classList,classDetail,studentData});
    } catch(err){
        console.log(err);
        res.send(err);
    } 
});

app.post('/inputClass',(req,res)=>{
    const request = req.body;
    // console.log(request);
    const newClass = new ClassObj({
        className:request.class,
        teacher: request.teacher,
        studentsNum: request.studentNum
    });
    newClass.save();
    res.redirect('back');
});

app.post('/inputStudent', (req,res)=>{
    const request = req.body;
        const newStudent = new Student({
            name:request.name,
            nisn:request.nisn,
            status:request.status,
            idClass:request.idClass
        })
        newStudent.save()
        .then(result=>res.send(newStudent))
        .catch(err=>res.send(err));
})

// Go To Update Form Page
app.get('/update-class/:id',async (req,res)=>{
    const id = req.params.id.trim();
    const classList = await ClassObj.find();
    const classData = await ClassObj.findById(id);
    res.render('inputClass',{title:'Update Data',classList,classData});
});

// Save the Update Class
app.put('/update-class',(req,res)=>{
    // res.send(req.body);
    const request = req.body;
    const id = req.body.id.trim();
    const data = {
        className: request.class,
        lesson: request.lesson,
        studentsNum: request.studentNum,
        teacher:request.teacher
    };
    ClassObj.findByIdAndUpdate(id,data)
        .then(response => {
            // console.log(`update: ${response}`);
            res.redirect('/');
    })
        .catch(err => res.send(`can not update ${err}`));
});

// Delete Class
app.delete('/delete-class',async (req,res)=>{
    const classId = req.body.id.trim();
    const response = {student:"",class:""};
    response.student = await Student.deleteMany({idClass:classId});
    response.class = await ClassObj.findByIdAndDelete(classId);
    res.send(response);
});

app.delete('/delete-student',(req,res)=>{
    Student.findByIdAndDelete(req.body.id)
        .then(response=>res.send(response))
        .catch(err=>res.send(err));
})

// Get Data to Update
app.put('/update-student',(req,res)=>{
    const id = req.body.id.trim();
    Student.findById(id)
        .then(result=>res.send(result))
        .catch(err=>{
            console.log(err);
            res.send(err);
        });
});
// Saving The update Data
app.put('/update-student/save',(req,res)=>{
    const id = req.body.id.trim();
    const data = {
        name:req.body.name,
        nisn:req.body.nisn,
        status:req.body.status
    };
    Student.findByIdAndUpdate(id,data)
        .then(result=> {
            res.send(result);
        })
        .catch(err=>{
            console.log(err);
            res.send(err);
        })
});



