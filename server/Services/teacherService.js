const teacherRepo = require('../Repositories/teacherRepository');

const registerTeacher = async (teacherData) => {
    // לוגיקה: למשל, לוודא שת"ז היא באורך 9 ספרות
    if (!teacherData.id || teacherData.id.length !== 9) {
        throw new Error("תעודת זהות חייבת להכיל 9 ספרות");
    }

    // קריאה ל-Repository לביצוע הרישום בפועל
    return await teacherRepo.addTeacher(teacherData);
};

const getTeacherDetails = async (id) => {
    const teachers = await teacherRepo.getAllTeachers();
    // לוגיקה: למצוא מורה ספציפית מתוך הרשימה
    return teachers.find(t => t.TeacherID === id);
};

module.exports = { registerTeacher, getTeacherDetails };