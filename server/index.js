const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./db'); // החיבור ל-DB

// ייבוא הנתיבים (Routes) מהשכבה שבנינו
const teacherRoutes = require('./Routes/teacherRoutes');
const studentRoutes = require('./Routes/studentRoutes');

const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json()); // קריטי: מאפשר לשרת לקרוא את הנתונים (JSON) שנשלח מה-React

// --- בדיקת חיבור ל-DB ---
poolPromise.then(() => {
    console.log("Success! The server is linked to your SSMS database.");
}).catch(err => {
    console.error("Database connection failed:", err);
});

// --- חיבור ה-Routes (השילוט) ---
// כל מה שקשור למורות יתחיל בכתובת /api/teachers
app.use('/api/teachers', teacherRoutes);

// כל מה שקשור לתלמידות יתחיל בכתובת /api/students
app.use('/api/students', studentRoutes);

// --- הרצת השרת ---
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});