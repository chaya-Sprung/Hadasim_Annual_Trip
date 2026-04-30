const { sql, poolPromise } = require('../db');

const addLocation = async (locationData) => {
    const pool = await poolPromise;
    
    const { ID, Coordinates, Time } = locationData;
    const { Longitude, Latitude } = Coordinates;

    return await pool.request()
        .input('StudentID', sql.VarChar, ID.toString())
        // Longitude
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
        SELECT l.*, s.FirstName, s.LastName
        FROM StudentLocations l
        INNER JOIN Students s ON l.StudentID = s.StudentID
        WHERE l.ReportTime = (
            SELECT MAX(ReportTime) 
            FROM StudentLocations 
            WHERE StudentID = l.StudentID
        )
    `);
    return result.recordset;
};

module.exports = { addLocation, getLastLocations };