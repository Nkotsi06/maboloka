import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://maboloka.onrender.com/api' 
  : 'http://localhost:5000/api';

const attendanceService = {
  // Mark attendance
  markAttendance: async (attendanceData) => {
    const response = await axios.post(`${API_URL}/attendance`, attendanceData);
    return response.data;
  },

  // Get all attendance records
  getAllAttendance: async () => {
    const response = await axios.get(`${API_URL}/attendance`);
    return response.data;
  },

  // Get attendance by employee ID
  getAttendanceByEmployee: async (employeeID) => {
    const response = await axios.get(`${API_URL}/attendance/employee/${employeeID}`);
    return response.data;
  },

  // Get attendance by date
  getAttendanceByDate: async (date) => {
    const response = await axios.get(`${API_URL}/attendance/date/${date}`);
    return response.data;
  },

  // Delete attendance record
  deleteAttendance: async (id) => {
    const response = await axios.delete(`${API_URL}/attendance/${id}`);
    return response.data;
  }
};

export default attendanceService;