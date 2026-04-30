const express = require('express');
const router = express.Router();
const teacherController = require('../Controllers/teacherController');

router.post('/register', teacherController.registerTeacher);
router.post('/login', teacherController.loginTeacher);
router.get('/', teacherController.getAllTeachers); 

module.exports = router;