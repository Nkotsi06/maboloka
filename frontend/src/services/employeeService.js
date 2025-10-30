import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

const employeeService = {
  // Create employee
  createEmployee: async (employeeData) => {
    const response = await axios.post(`${API_URL}/employees`, employeeData);
    return response.data;
  },

  // Get all employees
  getAllEmployees: async () => {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  }
};

export default employeeService;