import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Input, Card, Typography, Row, Col, Spin, Space, Tag } from 'antd';
import { SearchOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

const AllData = () => {
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resStudents, resTeachers] = await Promise.all([
                    axios.get('http://localhost:5000/api/students'),
                    axios.get('http://localhost:5000/api/teachers')
                ]);
                setStudents(resStudents.data);
                setTeachers(resTeachers.data);
            } catch (err) {
                console.error("שגיאה במשיכת הנתונים:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const studentColumns = [
        { title: 'תעודת זהות', dataIndex: 'StudentID', key: 'StudentID' },
        { 
            title: 'שם מלא', 
            key: 'name',
            render: (record) => `${record.FirstName} ${record.LastName}`
        },
        { 
            title: 'כיתה', 
            dataIndex: 'ClassName', 
            key: 'ClassName',
            render: (text) => <Tag color="blue">{text}</Tag>
        },
    ];

    const teacherColumns = [
        { title: 'תעודת זהות', dataIndex: 'TeacherID', key: 'TeacherID' },
        { 
            title: 'שם מלא', 
            key: 'name',
            render: (record) => `${record.FirstName} ${record.LastName}`
        },
        { 
            title: 'כיתה אחראית', 
            dataIndex: 'ClassName', 
            key: 'ClassName',
            render: (text) => <Tag color="orange">{text}</Tag>
        },
    ];

    const filteredStudents = students.filter(s => String(s.StudentID).includes(searchTerm));
    const filteredTeachers = teachers.filter(t => String(t.TeacherID).includes(searchTerm));

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <Spin size="large" tip="טוען נתונים מהמאגר..." />
        </div>
    );

    return (
        <div style={{ padding: '20px' }}>
            <Card style={{ marginBottom: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <Row gutter={[16, 16]} align="middle" justify="space-between">
                    <Col xs={24} md={12}>
                        <Title level={3} style={{ margin: 0 }}>
                            <TeamOutlined /> ניהול נתוני מערכת
                        </Title>
                        <Text type="secondary">צפייה וחיפוש בכלל המשתמשים הרשומים</Text>
                    </Col>
                    <Col xs={24} md={8}>
                        <Input 
                            size="large"
                            placeholder="חיפוש לפי תעודת זהות..." 
                            prefix={<SearchOutlined />} 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ borderRadius: '8px' }}
                        />
                    </Col>
                </Row>
            </Card>

            <Row gutter={[20, 20]}>
                <Col xs={24} lg={12}>
                    <Card 
                        title={<span><UserOutlined /> רשימת תלמידות</span>}
                        bordered={false}
                        className="custom-card"
                    >
                        <Table 
                            dataSource={filteredStudents} 
                            columns={studentColumns} 
                            rowKey="StudentID" 
                            pagination={{ pageSize: 5 }}
                            size="middle"
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={12}>
                    <Card 
                        title={<span><UserOutlined /> רשימת מורות</span>}
                        bordered={false}
                        className="custom-card"
                        headStyle={{ borderTop: '4px solid #e67e22' }}
                    >
                        <Table 
                            dataSource={filteredTeachers} 
                            columns={teacherColumns} 
                            rowKey="TeacherID" 
                            pagination={{ pageSize: 5 }}
                            size="middle"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AllData;