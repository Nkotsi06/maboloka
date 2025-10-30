import React, { useState, useEffect } from 'react';
import employeeService from '../services/employeeService';
import LoadingSpinner from '../components/LoadingSpinner';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    employeeID: '',
    employeeName: ''
  });
  const [formErrors, setFormErrors] = useState({
    employeeName: ''
  });
  const [addingEmployee, setAddingEmployee] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      console.log('Loading employees...');
      const response = await employeeService.getAllEmployees();
      console.log('Employees response:', response);
      if (response.success) {
        setEmployees(response.data);
      } else {
        setMessage({
          type: 'danger',
          text: response.message || 'Failed to load employees'
        });
      }
    } catch (error) {
      console.error('Error loading employees:', error);
      setMessage({
        type: 'danger',
        text: 'Failed to load employees. Please check your connection.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'employeeName') {
      // Allow only letters, spaces, and common punctuation
      const lettersOnly = value.replace(/[^a-zA-Z\s\-'.]/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: lettersOnly
      }));
      
      // Clear error when user starts typing
      if (formErrors.employeeName) {
        setFormErrors(prev => ({
          ...prev,
          employeeName: ''
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Validate employee ID
    if (!formData.employeeID.trim()) {
      errors.employeeID = 'Employee ID is required';
    }
    
    // Validate employee name is not empty
    if (!formData.employeeName.trim()) {
      errors.employeeName = 'Employee name is required';
    }
    // Validate employee name contains only letters
    else if (!/^[a-zA-Z\s\-'.]+$/.test(formData.employeeName.trim())) {
      errors.employeeName = 'Employee name should contain only letters, spaces, hyphens, and apostrophes';
    }
    // Validate employee name length
    else if (formData.employeeName.length > 50) {
      errors.employeeName = 'Employee name should not exceed 50 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setMessage({ type: '', text: '' });

    // Validate form before submission
    if (!validateForm()) {
      console.log('Form validation failed:', formErrors);
      setMessage({
        type: 'danger',
        text: 'Please fix the form errors before submitting'
      });
      return;
    }

    console.log('Form validation passed, submitting...');
    setAddingEmployee(true);

    try {
      const response = await employeeService.createEmployee({
        employeeID: formData.employeeID.trim(),
        employeeName: formData.employeeName.trim()
      });
      
      console.log('Create employee response:', response);
      
      if (response.success) {
        setMessage({
          type: 'success',
          text: 'Employee added successfully!'
        });
        
        // Reset form and reload employees
        setFormData({ employeeID: '', employeeName: '' });
        setFormErrors({ employeeName: '' });
        loadEmployees();
      } else {
        setMessage({
          type: 'danger',
          text: response.message || 'Failed to add employee'
        });
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      setMessage({
        type: 'danger',
        text: error.response?.data?.message || error.message || 'Error adding employee. Please try again.'
      });
    } finally {
      setAddingEmployee(false);
    }
  };

  const handleNameBlur = () => {
    // Trim whitespace and validate on blur
    const trimmedName = formData.employeeName.trim();
    setFormData(prev => ({
      ...prev,
      employeeName: trimmedName
    }));
    
    if (trimmedName && !/^[a-zA-Z\s\-'.]+$/.test(trimmedName)) {
      setFormErrors(prev => ({
        ...prev,
        employeeName: 'Employee name should contain only letters, spaces, hyphens, and apostrophes'
      }));
    }
  };

  // Check if form is valid for button disabling
  const isFormValid = formData.employeeID.trim() && 
                     formData.employeeName.trim() && 
                     !formErrors.employeeName;

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">EMPLOYEES</h1>
          <p className="page-subtitle">MANAGE EMPLOYEE DATABASE</p>
        </div>
      </div>

      <div className="container">
        {/* Add Employee Form */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">ADD NEW EMPLOYEE</div>
          <div className="card-body">
            {message.text && (
              <div className={`alert alert-${message.type}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="employeeID">
                    EMPLOYEE ID
                  </label>
                  <input
                    type="text"
                    id="employeeID"
                    name="employeeID"
                    className={`form-control ${formErrors.employeeID ? 'is-invalid' : ''}`}
                    value={formData.employeeID}
                    onChange={handleInputChange}
                    placeholder="Enter employee ID"
                    required
                  />
                  {formErrors.employeeID && (
                    <div className="invalid-feedback" style={{ display: 'block', color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {formErrors.employeeID}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="employeeName">
                    EMPLOYEE NAME 
                  </label>
                  <input
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    className={`form-control ${formErrors.employeeName ? 'is-invalid' : ''}`}
                    value={formData.employeeName}
                    onChange={handleInputChange}
                    onBlur={handleNameBlur}
                    placeholder="Enter employee name"
                    required
                    maxLength={50}
                  />
                  {formErrors.employeeName && (
                    <div className="invalid-feedback" style={{ display: 'block', color: '#dc3545', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {formErrors.employeeName}
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={addingEmployee || !isFormValid}
                style={{ marginTop: '1rem' }}
              >
                {addingEmployee ? <LoadingSpinner size="small" /> : 'Add Employee'}
              </button>
            </form>
          </div>
        </div>

        {/* Employees List */}
        <div className="card">
          <div className="card-header">
            EMPLOYEE LIST ({employees.length})
          </div>
          <div className="card-body">
            {loading ? (
              <LoadingSpinner />
            ) : employees.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
                NO EMPLOYEES FOUND. ADD SOME EMPLOYEES TO GET STARTED.
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>EMPLOYEE ID</th>
                      <th>EMPLOYEE NAME</th>
                      <th>DATE ADDED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map(employee => (
                      <tr key={employee.id}>
                        <td style={{ fontWeight: '600' }}>{employee.employeeID}</td>
                        <td>{employee.employeeName}</td>
                        <td>
                          {new Date(employee.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;