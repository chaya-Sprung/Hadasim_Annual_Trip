import React, { useState } from 'react';
import { getMyStudents, registerStudent } from './services/api';

function App() {
  // State עבור החיפוש
  const [searchClass, setSearchClass] = useState('');
  const [students, setStudents] = useState([]);

  // State עבור טופס ההוספה
  const [newStudent, setNewStudent] = useState({
    id: '',
    firstName: '',
    lastName: '',
    className: ''
  });

  // פונקציה לשליפת נתונים
  const handleSearch = async () => {
    try {
      const response = await getMyStudents(searchClass);
      setStudents(response.data);
    } catch (err) {
      alert("שגיאה בשליפת נתונים");
    }
  };

  // פונקציה להוספת נתונים
  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await registerStudent(newStudent);
      alert("התלמידה נרשמה בהצלחה!");
      // איפוס הטופס
      setNewStudent({ id: '', firstName: '', lastName: '', className: '' });
    } catch (err) {
      alert("שגיאה ברישום: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ padding: '20px', direction: 'rtl', fontFamily: 'Arial' }}>
      <h1>מערכת ניהול טיול שנתי</h1>

      {/* חלק 1: טופס הוספת תלמידה */}
      <div style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '8px' }}>
        <h3>רישום תלמידה חדשה</h3>
        <form onSubmit={handleAddStudent}>
          <input placeholder="תעודת זהות" value={newStudent.id} onChange={(e) => setNewStudent({...newStudent, id: e.target.value})} />
          <input placeholder="שם פרטי" value={newStudent.firstName} onChange={(e) => setNewStudent({...newStudent, firstName: e.target.value})} />
          <input placeholder="שם משפחה" value={newStudent.lastName} onChange={(e) => setNewStudent({...newStudent, lastName: e.target.value})} />
          <input placeholder="כיתה" value={newStudent.className} onChange={(e) => setNewStudent({...newStudent, className: e.target.value})} />
          <button type="submit">רשמי לטיול</button>
        </form>
      </div>

      <hr />

      {/* חלק 2: חיפוש והצגת תלמידות */}
      <div>
        <h3>חיפוש תלמידות לפי כיתה</h3>
        <input 
          placeholder="הזיני שם כיתה (למשל: ח1)" 
          value={searchClass}
          onChange={(e) => setSearchClass(e.target.value)}
        />
        <button onClick={handleSearch}>הצג רשימה</button>
      </div>

      <table border="1" style={{ width: '100%', marginTop: '20px', textAlign: 'right' }}>
        <thead>
          <tr style={{ backgroundColor: '#ddd' }}>
            <th>תעודת זהות</th>
            <th>שם פרטי</th>
            <th>שם משפחה</th>
            <th>כיתה</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.StudentID}>
              <td>{s.StudentID}</td>
              <td>{s.FirstName}</td>
              <td>{s.LastName}</td>
              <td>{s.ClassName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;