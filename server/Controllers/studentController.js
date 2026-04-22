const studentService = require('../Services/studentService');

const registerStudent = async (req, res) => {
    try {
        await studentService.registerStudent(req.body);
        res.status(201).json({ message: "התלמידה נוספה בהצלחה!" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getMyStudents = async (req, res) => {
    try {
        // נניח שהלקוח שולח לנו את שם הכיתה בכתובת או בפרמטר
        const className = req.query.className; 
        const students = await studentService.getStudentsForTeacher(className);
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: "שגיאה בשליפת התלמידות" });
    }
};

module.exports = { registerStudent, getMyStudents };