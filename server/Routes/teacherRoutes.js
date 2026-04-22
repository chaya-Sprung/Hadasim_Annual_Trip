const express = require('express');
const router = express.Router();
const teacherController = require('../Controllers/teacherController');

// כתובת מלאה תהיה: /api/teachers/register
router.post('/register', teacherController.registerTeacher);

module.exports = router;