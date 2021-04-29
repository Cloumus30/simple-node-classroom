const express = require('express');
// const {body,validationResult} = require('express-validator');
// const ClassObj = require('../Model/Class');
const router = express.Router();

const studentsController = require('../Controllers/studentsController');

router.post('/inputStudent', studentsController.input);

router.delete('/delete-student',studentsController.destroy);

// Get Data to Update
router.put('/update-student',studentsController.edit);

// Saving The update Data
router.put('/update-student/save',studentsController.update);

module.exports=router;