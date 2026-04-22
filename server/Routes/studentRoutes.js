const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/studentController');

// כתובת לרישום: /api/students/register
router.post('/register', studentController.registerStudent);

// כתובת לשליפה עבור המורה: /api/students/my-class
router.get('/my-class', studentController.getMyStudents);

module.exports = router;