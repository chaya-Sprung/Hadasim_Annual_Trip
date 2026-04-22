import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerTeacher = (data) => axios.post(`${API_URL}/teachers/register`, data);
export const registerStudent = (data) => axios.post(`${API_URL}/students/register`, data);
export const getMyStudents = (className) => axios.get(`${API_URL}/students/my-class?className=${className}`);