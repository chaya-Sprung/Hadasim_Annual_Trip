const studentRepo = require('../Repositories/studentRepository');

const registerStudent = async (studentData) => {
    // בדיקת תקינות בסיסית
    if (!studentData.firstName || !studentData.lastName) {
        throw new Error("שם פרטי ושם משפחה הם שדות חובה");
    }
    return await studentRepo.addStudent(studentData);
};

// לוגיקה חשובה: קבלת תלמידות לפי הרשאה של מורה
const getStudentsForTeacher = async (teacherClass) => {
    // כאן ה-Service מוודא שאנחנו פונים ל-Repo עם הכיתה הנכונה
    const students = await studentRepo.getStudentsByClass(teacherClass);
    
    if (students.length === 0) {
        console.log(`לא נמצאו תלמידות בכיתה ${teacherClass}`);
    }
    
    return students;
};

module.exports = { registerStudent, getStudentsForTeacher };