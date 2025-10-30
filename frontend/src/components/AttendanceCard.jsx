import React from 'react';

const AttendanceCard = ({ record, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this attendance record?')) {
      onDelete(record.id);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div style={styles.cardContent}>
          <div style={styles.employeeInfo}>
            <h4 style={styles.employeeName}>{record.employeeName}</h4>
            <p style={styles.employeeID}>ID: {record.employeeID}</p>
            <p style={styles.date}>
              {new Date(record.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div style={styles.statusSection}>
            <span 
              className={`badge badge-${record.status.toLowerCase()}`}
              style={styles.statusBadge}
            >
              {record.status}
            </span>
            <button
              onClick={handleDelete}
              style={styles.deleteButton}
              title="Delete record"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  employeeInfo: {
    flex: 1
  },
  employeeName: {
    margin: '0 0 0.5rem 0',
    color: '#343a40',
    fontSize: '1.2rem'
  },
  employeeID: {
    margin: '0 0 0.25rem 0',
    color: '#6c757d',
    fontSize: '0.9rem'
  },
  date: {
    margin: 0,
    color: '#495057',
    fontSize: '0.9rem'
  },
  statusSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  statusBadge: {
    fontSize: '0.8rem',
    padding: '0.35rem 0.65rem'
  },
  deleteButton: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default AttendanceCard;