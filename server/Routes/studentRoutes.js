const express = require('express');
const router = express.Router();
const studentController = require('../Controllers/studentController');

router.post('/register', studentController.registerStudent);
router.get('/class/:className', studentController.getStudentsByClass);
router.get('/', studentController.getAllStudents); 
router.get('/locations', studentController.getLocations);
module.exports = router;