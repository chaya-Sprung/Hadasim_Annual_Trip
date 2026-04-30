import React, { useState } from 'react';
import axios from 'axios';
import TeacherDashboard from './components/TeacherDashboard';
import { Input, Button, Card, Typography, Space, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './styles/global.css'; 
const { Title } = Typography;
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teacherData, setTeacherData] = useState(null);
  const [idInput, setIdInput] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/teachers/login', { id: idInput });
      if (response.data.success) {
        setTeacherData(response.data.teacher);
        setIsLoggedIn(true);
        message.success("התחברת בהצלחה!");
      }
    } catch (err) {
message.error("כניסה נכשלה: המורה לא קיימת במערכת");    }
  };
 if (!isLoggedIn) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, textAlign: 'center', borderRadius: '15px' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={2}>כניסת מורות</Title>
          
          <Input 
            size="large" 
            placeholder="תעודת זהות" 
            prefix={<UserOutlined />} 
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
          />
          
          <Button type="primary" size="large" block onClick={handleLogin}>
            כניסה
          </Button>
        </Space>
      </Card>
    </div>
  );
}

  return (
    <div style={{ direction: 'rtl', padding: '20px' }}>
      <h2>שלום המורה, {teacherData.FirstName}</h2>
<TeacherDashboard teacherData={teacherData} />
      <button onClick={() => setIsLoggedIn(false)}>התנתקות</button>
    </div>
  );
}

export default App;