const {validationResult} = require('express-validator');
const ClassObj = require('../Model/Class');
const Student = require('../Model/Student');

const input = async (req,res)=>{
    const classList = await ClassObj.find();
    res.render('ClassPage/inputClass',{title:'Input Class',classList});
}

const show = async (req,res)=>{
    try{
        const id = req.params.id.trim();
        const classList = await ClassObj.find();
        const classDetail = await ClassObj.findById(id);
        const studentData = await Student.find({idClass:id});
        res.render('ClassPage/ListStudent',{title:'Class',classList,classDetail,studentData});
    } catch(err){
        console.log(err);
        res.send(err);
    } 
};

const save = (req,res)=>{
    const errors = validationResult(req);
    // Check if there are errors
    if (!errors.isEmpty()) {
        // Send errors to the client
        return res.json({ errors: errors.array() });
    }

    const request = req.body;
    // console.log(request);
    // Saving New Class Data to DB
    const newClass = new ClassObj({
        className:request.className,
        teacher: request.teacher,
        studentsNum: request.studentsNum,
        lesson:request.lesson
    });
    newClass.save();
    res.json({status:'oke'});
};

const edit = async (req,res)=>{
    const id = req.params.id.trim();
    const classList = await ClassObj.find();
    const classData = await ClassObj.findById(id);
    res.render('ClassPage/inputClass',{title:'Update Data',classList,classData});
};


const update = (req,res)=>{
    // res.send(req.body);
    // console.log(req.body);
    const errors = validationResult(req);
    // console.log(req.body);
    // Check if there are errors
    if (!errors.isEmpty()) {
        // Send errors to the client
        // console.log(errors.array());
        return res.json({ errors: errors.array() });
    }

    const request = req.body;
    const id = req.body.id.trim();
    const data = {
        className: request.className,
        lesson: request.lesson,
        studentsNum: request.studentsNum,
        teacher:request.teacher
    };
    ClassObj.findByIdAndUpdate(id,data,{runValidators:true})
        .then(response => {
            // console.log(`update: ${response}`);
            res.send(response);
    })
        .catch(err => res.send(`can not update ${err}`));
};

const destroy = async (req,res)=>{
    const classId = req.body.id.trim();
    const response = {student:"",class:""};
    response.student = await Student.deleteMany({idClass:classId});
    response.class = await ClassObj.findByIdAndDelete(classId);
    res.send(response);
};





module.exports = {
    input,
    show,
    save,
    edit,
    update,
    destroy
};