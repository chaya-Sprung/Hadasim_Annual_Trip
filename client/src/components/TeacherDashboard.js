import React, { useState } from 'react';
import StudentRegistration from './StudentRegistration';
import TeacherRegistration from './TeacherRegistration';
import ClassStudents from './ClassStudents';
import AllData from './AllData';
import MapComponent from './MapComponent';

const TeacherDashboard = ({ teacherData }) => {
    const [view, setView] = useState('menu'); 

    return (
        <div className="main-container" style={{ padding: '20px', direction: 'rtl' }}>
            <h2>שלום המורה {teacherData.FirstName}, ברוכה הבאה לאזור הניהול</h2>
            
            {/* תפריט כפתורים */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <button onClick={() => setView('registerStudent')}>רישום תלמידה</button>
                <button onClick={() => setView('registerTeacher')}>רישום מורה</button>
                <button onClick={() => setView('myClass')}>תלמידות הכיתה שלי</button>
                <button onClick={() => setView('allData')}>כל התלמידות והמורות</button>
                <button onClick={() => setView('map')}>הצגת מפת איכון</button>
                <button onClick={() => setView('menu')} style={{ backgroundColor: '#ccc' }}>חזרה לתפריט</button>
            </div>

            <hr />

            <div style={{ marginTop: '20px' }}>
                {view === 'registerStudent' && <StudentRegistration />}
                {view === 'registerTeacher' && <TeacherRegistration />}
                {view === 'myClass' && <ClassStudents className={teacherData.ClassName} />}
                {view === 'allData' && <AllData />}
                {view === 'map' && <MapComponent teacherData={teacherData} />}                  {view === 'menu' && <p>בחרי פעולה מהתפריט למעלה כדי להתחיל.</p>}
            </div>
        </div>
    );
};

export default TeacherDashboard;