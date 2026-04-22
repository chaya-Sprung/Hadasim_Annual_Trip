const sql = require('mssql'); //אומר לו להשתמש בספריית mssql כדי להתחבר למסד הנתונים        

const config = {
    user: 'sa', 
    password: '12345', 
    server: 'localhost', 
    database: 'HadasimTrip',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err));

module.exports = {
    sql, poolPromise
};