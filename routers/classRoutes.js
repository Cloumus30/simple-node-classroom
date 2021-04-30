const express = require('express');
const {body} = require('express-validator');
const router = express.Router();
// Import Controller
const classController = require('../Controllers/classController');

router.get('/inputClass',classController.input);

router.get('/classPage/:id',classController.show);

router.post('/inputClass',
//Validation with express-validator
body('className').isLength({min:1}).withMessage('Kelas Harus Diisi'),
body('teacher').isLength({min:1}).withMessage('Nama Guru Harus Diisi'),
body('studentsNum').isInt({min:1}).withMessage('Jumlah Murid Harus Diisi'),
body('lesson').isLength({min:1}).withMessage('Mata Pelajaran Harus Diisi'),
// Controller
classController.save);

// Go To Update Form Page
router.get('/update-class/:id',classController.edit);

// Save the Update Class
router.put('/update-class',
//Validation with express-validator
body('className').isLength({min:1}).withMessage('Kelas Harus Diisi'),
body('teacher').isLength({min:1}).withMessage('Nama Guru Harus Diisi'),
body('studentsNum').isInt({min:1}).withMessage('Jumlah Murid Harus Diisi'),
body('lesson').isLength({min:1}).withMessage('Mata Pelajaran Harus Diisi'),
// Controller
classController.update);

// Delete Class
router.delete('/delete-class',classController.destroy);

module.exports=router;