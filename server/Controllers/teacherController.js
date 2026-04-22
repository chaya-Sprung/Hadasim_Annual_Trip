const teacherService = require('../Services/teacherService');

const registerTeacher = async (req, res) => {
    try {
        // אנחנו שולחים ל-Service את כל ה-body שהגיע מהלקוח
        const result = await teacherService.registerTeacher(req.body);
        res.status(201).json({ message: "המורה נרשמה במערכת בהצלחה!", data: result });
    } catch (err) {
        // אם משהו השתבש (למשל ת"ז לא תקינה), נחזיר שגיאה 400
        res.status(400).json({ error: err.message });
    }
};

module.exports = { registerTeacher };