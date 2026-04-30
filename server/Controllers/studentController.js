const studentService = require('../Services/studentService');

const registerStudent = async (req, res) => {
    try {
        await studentService.registerStudent(req.body);
        res.status(201).json({ success: true, message: "התלמידה נרשמה בהצלחה" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await studentService.getAllStudents();
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudentsByClass = async (req, res) => {
    try {
        const { className } = req.params;
        const students = await studentService.getStudentsByClass(className);
        res.json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getLocations = async (req, res) => {
    try {
        const locations = await studentService.getLastLocations();
        res.json(locations);
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerStudent, getAllStudents, getStudentsByClass, getLocations };