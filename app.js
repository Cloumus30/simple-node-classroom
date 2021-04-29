const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
// third party middleware
const methodOverride = require('method-override');
const {body,validationResult} = require('express-validator');
// Import Models
const ClassObj = require('./Model/Class');
const Student = require('./Model/Student');
// import Routers
const ClassRouters = require('./routers/classRoutes');
const StudentRouters = require('./routers/studentRoutes');

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

app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
// override with POST having ?_method=
app.use(methodOverride('_method'))

mongoose.set('useFindAndModify',false);

app.get('/',async (req,res)=>{
    const classList = await ClassObj.find();
    // res.send(classList);
    res.render('ClassPage/profile',{title:'Home Page',classList});
});

// Class Routers
app.use(ClassRouters);

// Students Routers
app.use(StudentRouters);


