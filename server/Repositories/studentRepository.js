const { sql, poolPromise } = require('../db');

const getAllStudents = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Students');
    return result.recordset;
};

const registerStudent = async (s) => {
    const pool = await poolPromise;
    return await pool.request()
        .input('id', sql.VarChar, s.id)
        .input('fn', sql.NVarChar, s.firstName)
        .input('ln', sql.NVarChar, s.lastName)
        .input('cn', sql.VarChar, s.className)
        .query('INSERT INTO Students (StudentID, FirstName, LastName, ClassName) VALUES (@id, @fn, @ln, @cn)');
};

const getStudentsByClass = async (className) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('cn', sql.VarChar, className)
        .query('SELECT * FROM Students WHERE ClassName = @cn');
    return result.recordset;
};

const addLocation = async (locationData) => {
    const pool = await poolPromise;
    const { ID, Coordinates, Time } = locationData;
    const { Longitude, Latitude } = Coordinates;

    return await pool.request()
        .input('StudentID', sql.VarChar, ID.toString())
        .input('LongDegrees', sql.Int, parseInt(Longitude.Degrees))
        .input('LongMinutes', sql.Int, parseInt(Longitude.Minutes))
        .input('LongSeconds', sql.Int, parseInt(Longitude.Seconds))
        .input('LatDegrees', sql.Int, parseInt(Latitude.Degrees))
        .input('LatMinutes', sql.Int, parseInt(Latitude.Minutes))
        .input('LatSeconds', sql.Int, parseInt(Latitude.Seconds))
        .input('ReportTime', sql.DateTime, new Date(Time))
        .query(`
            INSERT INTO StudentLocations 
            (StudentID, LongDegrees, LongMinutes, LongSeconds, LatDegrees, LatMinutes, LatSeconds, ReportTime) 
            VALUES 
            (@StudentID, @LongDegrees, @LongMinutes, @LongSeconds, @LatDegrees, @LatMinutes, @LatSeconds, @ReportTime)
        `);
};

const getLastLocations = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query(`
        SELECT 
            s.StudentID, 
            s.FirstName, 
            s.LastName, 
            s.ClassName,
            l.LatDegrees, l.LatMinutes, l.LatSeconds,
            l.LongDegrees, l.LongMinutes, l.LongSeconds,
            l.ReportTime
        FROM Students s
        LEFT JOIN StudentLocations l ON s.StudentID = l.StudentID
        AND l.ReportTime = (
            SELECT MAX(ReportTime) 
            FROM StudentLocations 
            WHERE StudentID = s.StudentID
        )
    `);
    return result.recordset;
};

const simulateMovement = async () => {
    try {
        const pool = await poolPromise;

        await pool.request().query('DELETE FROM StudentLocations');

        const studentsResult = await pool.request().query('SELECT StudentID FROM Students');
        const students = studentsResult.recordset;

        const baseLat = 31.7683; 
        const baseLng = 35.2137;

        for (let student of students) {
const latDiff = (Math.random() - 0.5) * 0.15; 
const lngDiff = (Math.random() - 0.5) * 0.15;

            const newLat = baseLat + latDiff;
            const newLng = baseLng + lngDiff;

            const latDeg = Math.floor(newLat);
            const latMin = Math.floor((newLat - latDeg) * 60);
            const latSec = Math.floor(((newLat - latDeg) * 60 - latMin) * 60);

            const lngDeg = Math.floor(newLng);
            const lngMin = Math.floor((newLng - lngDeg) * 60);
            const lngSec = Math.floor(((newLng - lngDeg) * 60 - lngMin) * 60);

            await pool.request()
                .input('ID', student.StudentID)
                .input('LDeg', latDeg)
                .input('LMin', latMin)
                .input('LSec', latSec)
                .input('LnDeg', lngDeg)
                .input('LnMin', lngMin)
                .input('LnSec', lngSec)
                .query(`
                    INSERT INTO StudentLocations (StudentID, LatDegrees, LatMinutes, LatSeconds, LongDegrees, LongMinutes, LongSeconds, ReportTime)
                    VALUES (@ID, @LDeg, @LMin, @LSec, @LnDeg, @LnMin, @LnSec, GETDATE())
                `);
        }
        console.log("🔄 הסימולציה עודכנה: התלמידות התקדמו בטווח של קילומטר מירושלים.");
    } catch (err) {
        console.error("Simulation error:", err);
    }
};

module.exports = { 
    registerStudent, 
    getAllStudents, 
    getStudentsByClass, 
    addLocation, 
    getLastLocations, 
    simulateMovement 
};