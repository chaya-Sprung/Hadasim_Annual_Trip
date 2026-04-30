const { sql, poolPromise } = require('../db');

const registerTeacher = async (t) => {
    const pool = await poolPromise;
    return await pool.request()
        .input('id', sql.VarChar, t.id)
        .input('fn', sql.NVarChar, t.firstName)
        .input('ln', sql.NVarChar, t.lastName)
        .input('cn', sql.VarChar, t.className)
        .query('INSERT INTO Teachers (TeacherID, FirstName, LastName, ClassName) VALUES (@id, @fn, @ln, @cn)');
};

const getTeacherById = async (id) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id', sql.VarChar, id)
        .query('SELECT * FROM Teachers WHERE TeacherID = @id');
    return result.recordset[0];
};

const getTeacherByClass = async (className) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('className', sql.VarChar, className)
        .query('SELECT * FROM Teachers WHERE ClassName = @className');
    return result.recordset[0];
};

const getAllTeachers = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Teachers');
    return result.recordset;
};

module.exports = { registerTeacher, getTeacherById, getTeacherByClass, getAllTeachers };