const teacherService = require('../Services/teacherService');

const registerTeacher = async (req, res) => {
    try {
        await teacherService.registerTeacher(req.body);
        res.status(201).json({ success: true, message: "המורה נרשמה בהצלחה" });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

const loginTeacher = async (req, res) => {
    try {
        const { id } = req.body;
        const teacher = await teacherService.getTeacherById(id);
        if (teacher) {
            res.json({ success: true, teacher });
        } else {
            res.status(401).json({ success: false, message: "המורה לא נמצאה" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllTeachers = async (req, res) => {
    try {
        const teachers = await teacherService.getAllTeachers();
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerTeacher, loginTeacher, getAllTeachers };