const { sql, poolPromise } = require('../db');
//הוספת תלמידה
const addStudent = async (studentData) => {
    const pool = await poolPromise;
    return await pool.request()
        .input('StudentID', sql.VarChar, studentData.id)
        .input('FirstName', sql.NVarChar, studentData.firstName)
        .input('LastName', sql.NVarChar, studentData.lastName)
        .input('ClassName', sql.NVarChar, studentData.className)
        .query(`INSERT INTO Students (StudentID, FirstName, LastName, ClassName) 
                VALUES (@StudentID, @FirstName, @LastName, @ClassName)`);
};
//קבלת כל התלמידים
const getAllStudents = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Students');
    return result.recordset;
};
//קבלת תלמידים לפי כיתה
const getStudentsByClass = async (className) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('ClassName', sql.NVarChar, className)
        .query('SELECT * FROM Students WHERE ClassName = @ClassName');
    return result.recordset;
};

module.exports = { addStudent, getAllStudents, getStudentsByClass };