const { sql, poolPromise } = require('../db');

const addTeacher = async (teacherData) => {
    const pool = await poolPromise;
    return await pool.request()
        .input('TeacherID', sql.VarChar, teacherData.id)
        .input('FirstName', sql.NVarChar, teacherData.firstName)
        .input('LastName', sql.NVarChar, teacherData.lastName)
        .input('ClassName', sql.NVarChar, teacherData.className)
        .query(`INSERT INTO Teachers (TeacherID, FirstName, LastName, ClassName) 
                VALUES (@TeacherID, @FirstName, @LastName, @ClassName)`);
};

const getAllTeachers = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Teachers');
    return result.recordset;
};

module.exports = { addTeacher, getAllTeachers };