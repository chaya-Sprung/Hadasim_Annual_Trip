import React, { useState } from 'react';
import axios from 'axios';

const TeacherRegistration = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', id: '', className: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
try {
    await axios.post('http://localhost:5000/api/teachers/register', formData);
    alert("המורה נרשמה בהצלחה!");
} catch (err) {
    alert(err.response?.data?.error || "שגיאה ברישום המורה");
}
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
            <h3>רישום מורה חדשה</h3>
            <input type="text" placeholder="שם פרטי" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
            <input type="text" placeholder="שם משפחה" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
            <input type="text" placeholder="תעודת זהות" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} required />
            <input type="text" placeholder="כיתה" value={formData.className} onChange={(e) => setFormData({...formData, className: e.target.value})} required />
            <button type="submit">בצע רישום</button>
        </form>
    );
};

export default TeacherRegistration;