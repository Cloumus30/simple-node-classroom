const Student = require('../Model/Student');

const input = (req,res)=>{
    const request = req.body;
        const newStudent = new Student({
            name:request.name,
            nisn:request.nisn,
            status:request.status,
            idClass:request.idClass
        })
        newStudent.save()
        .then(result=>{
            res.send(newStudent)
        })
        .catch(err=>{
            res.send(err);
        });
};

const destroy = (req,res)=>{
    Student.findByIdAndDelete(req.body.id)
        .then(response=>res.send(response))
        .catch(err=>res.send(err));
};

const edit = (req,res)=>{
    const id = req.body.id.trim();
    Student.findById(id)
        .then(result=>res.send(result))
        .catch(err=>{
            console.log(err);
            res.send(err);
        });
}

const update = (req,res)=>{
    const id = req.body.id.trim();
    const data = {
        name:req.body.name,
        nisn:req.body.nisn,
        status:req.body.status
    };
    Student.findByIdAndUpdate(id,data,{runValidators:true})
        .then(result=> {
            res.send(result);
        })
        .catch(err=>{
            res.send(err);
        })
}

module.exports={
    input,
    destroy,
    edit,
    update
};