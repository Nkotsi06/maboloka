import React, { useState, useEffect } from 'react';
import attendanceService from '../services/attendanceService';
import AttendanceCard from '../components/AttendanceCard';
import LoadingSpinner from '../components/LoadingSpinner';

const AttendanceDashboard = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    date: '',
    employeeID: '',
    status: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadAttendance();
  }, []);

  useEffect(() => {
    // Filter logic moved directly inside useEffect
    let filtered = [...attendance];

    // Apply filters
    if (filters.date) {
      filtered = filtered.filter(record => record.date === filters.date);
    }
    if (filters.employeeID) {
      filtered = filtered.filter(record => record.employeeID === filters.employeeID);
    }
    if (filters.status) {
      filtered = filtered.filter(record => record.status === filters.status);
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(record =>
        record.employeeName.toLowerCase().includes(term) ||
        record.employeeID.toLowerCase().includes(term)
      );
    }

    setFilteredAttendance(filtered);
  }, [attendance, filters, searchTerm]); // Now all dependencies are properly declared

  const loadAttendance = async () => {
    try {
      const response = await attendanceService.getAllAttendance();
      if (response.success) {
        setAttendance(response.data);
      }
    } catch (error) {
      console.error('Error loading attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleDeleteAttendance = async (id) => {
    try {
      const response = await attendanceService.deleteAttendance(id);
      if (response.success) {
        // Remove from local state
        setAttendance(prev => prev.filter(record => record.id !== id));
      }
    } catch (error) {
      console.error('Error deleting attendance:', error);
      alert('Failed to delete attendance record');
    }
  };

  const clearFilters = () => {
    setFilters({
      date: '',
      employeeID: '',
      status: ''
    });
    setSearchTerm('');
  };

  const uniqueEmployees = [...new Set(attendance.map(record => record.employeeID))];

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">ATTENDANCE DASHBOARD</h1>
          <p className="page-subtitle">VIEW AND MANAGE ATTENDANCE RECORDS</p>
        </div>
      </div>

      <div className="container">
        {/* Filters */}
        <div className="card">
          <div className="card-header">Filters & Search</div>
          <div className="card-body">
            <div className="filters">
              <div className="filter-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={filters.date}
                  onChange={(e) => handleFilterChange('date', e.target.value)}
                />
              </div>

              <div className="filter-group">
                <label className="form-label">Employee ID</label>
                <select
                  className="form-select"
                  value={filters.employeeID}
                  onChange={(e) => handleFilterChange('employeeID', e.target.value)}
                >
                  <option value="">All Employees</option>
                  {uniqueEmployees.map(id => (
                    <option key={id} value={id}>{id}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>

              <div className="filter-group search-box">
                <label className="form-label">Search</label>
                <div style={{ position: 'relative' }}>
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={clearFilters}
              className="btn btn-secondary"
              style={{ marginTop: '1rem' }}
            >
              CLEAR FILTERS
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="card">
          <div className="card-header">
            ATTENDANCE RECORDS ({filteredAttendance.length})
          </div>
          <div className="card-body">
            {loading ? (
              <LoadingSpinner />
            ) : filteredAttendance.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#6c757d' }}>
                NO ATTENDANCE RECORDS FOUND 
              </div>
            ) : (
              <div>
                {filteredAttendance.map(record => (
                  <AttendanceCard
                    key={record.id}
                    record={record}
                    onDelete={handleDeleteAttendance}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;