const studentRepository = require('../Repositories/studentRepository');

const registerStudent = async (studentData) => {
    return await studentRepository.registerStudent(studentData);
};

const getAllStudents = async () => {
    return await studentRepository.getAllStudents();
};

const getStudentsByClass = async (className) => {
    return await studentRepository.getStudentsByClass(className);
};
const getLastLocations = async () => {
    return await studentRepository.getLastLocations();
};
module.exports = { registerStudent, getAllStudents, getStudentsByClass, getLastLocations  };