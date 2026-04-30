const teacherRepository = require('../Repositories/teacherRepository');

const registerTeacher = async (teacherData) => {
    const existing = await teacherRepository.getTeacherByClass(teacherData.className);
    if (existing) {
        throw new Error(`הכיתה ${teacherData.className} כבר תפוסה`);
    }
    return await teacherRepository.registerTeacher(teacherData);
};

const getTeacherById = async (id) => {
    return await teacherRepository.getTeacherById(id);
};

const getAllTeachers = async () => {
    return await teacherRepository.getAllTeachers();
};

module.exports = { registerTeacher, getTeacherById, getAllTeachers };