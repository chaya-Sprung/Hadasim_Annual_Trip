const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./db');
const teacherRoutes = require('./Routes/teacherRoutes');
const studentRoutes = require('./Routes/studentRoutes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use((err, req, res, next) => {
    console.error("🔥 Error caught in Global Handler:", err.stack);
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: "אופס! קרתה שגיאה בשרת",
        error: err.message
    });
});

poolPromise.then(() => {
    console.log("✅ Success! Linked to SSMS database.");
}).catch(err => {
    console.error("❌ Database connection failed:", err);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const studentRepository = require('./Repositories/studentRepository');
setInterval(async () => {
    try {
        await studentRepository.simulateMovement();
    } catch (err) {
        console.error("Error in simulation:", err);
    }
}, 60000);