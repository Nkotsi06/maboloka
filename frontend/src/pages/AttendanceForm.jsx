import React, { useState, useEffect } from 'react';
import attendanceService from '../services/attendanceService';
import employeeService from '../services/employeeService';
import LoadingSpinner from '../components/LoadingSpinner';

const AttendanceForm = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeID: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present'
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [employeesLoading, setEmployeesLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await employeeService.getAllEmployees();
      if (response.success) {
        setEmployees(response.data);
      }
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setEmployeesLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If employeeID is selected from dropdown, auto-fill the name
    if (name === 'employeeID') {
      const selectedEmployee = employees.find(emp => emp.employeeID === value);
      if (selectedEmployee) {
        setFormData(prev => ({
          ...prev,
          employeeName: selectedEmployee.employeeName,
          employeeID: selectedEmployee.employeeID
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await attendanceService.markAttendance(formData);
      
      if (response.success) {
        setMessage({
          type: 'success',
          text: 'Attendance marked successfully!'
        });
        
        // Reset form
        setFormData({
          employeeName: '',
          employeeID: '',
          date: new Date().toISOString().split('T')[0],
          status: 'Present'
        });
      } else {
        setMessage({
          type: 'danger',
          text: response.message || 'Failed to mark attendance'
        });
      }
    } catch (error) {
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || 'Error marking attendance'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">MARK ATTENDANCE</h1>
          <p className="page-subtitle">RECORD DAILY EMPLOYEE ATTENDANCE </p>
        </div>
      </div>

      <div className="container">
        <div className="form-container">
          {message.text && (
            <div className={`alert alert-${message.type}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="employeeID">
                Employee
              </label>
              {employeesLoading ? (
                <LoadingSpinner size="small" />
              ) : (
                <select
                  id="employeeID"
                  name="employeeID"
                  className="form-select"
                  value={formData.employeeID}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map(employee => (
                    <option key={employee.employeeID} value={employee.employeeID}>
                      {employee.employeeName} ({employee.employeeID})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="employeeName">
                Employee Name
              </label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                className="form-control"
                value={formData.employeeName}
                onChange={handleInputChange}
                placeholder="Enter employee name"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="date">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="form-control"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleInputChange}
                required
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? <LoadingSpinner size="small" /> : 'Mark Attendance'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AttendanceForm;