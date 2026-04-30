import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ClassStudents = ({ className }) => {
    const [students, setStudents] = useState([]);
    const [searchId, setSearchId] = useState('');

    useEffect(() => {
        const fetchClassData = async () => {
            const res = await axios.get(`http://localhost:5000/api/students/class/${className}`);
            setStudents(res.data);
        };
        fetchClassData();
    }, [className]);

    const filtered = students.filter(s => s.StudentID.includes(searchId));

    return (
        <div>
            <h3>תלמידות כיתה {className}</h3>
            <input type="text" placeholder="חיפוש לפי ת''ז" onChange={(e) => setSearchId(e.target.value)} />
            <ul>
                {filtered.map(s => <li key={s.StudentID}>{s.FirstName} {s.LastName} ({s.StudentID})</li>)}
            </ul>
        </div>
    );
};

export default ClassStudents;