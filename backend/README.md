# Attendance Tracker Backend

Node.js + Express backend for Employee Attendance Tracker system.

## Features

- RESTful API for attendance management
- MySQL database integration
- CORS enabled
- Error handling middleware
- Input validation
- Environment-based configuration

## API Endpoints

### Attendance
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance` - Get all attendance records
- `GET /api/attendance/employee/:employeeID` - Get attendance by employee
- `GET /api/attendance/date/:date` - Get attendance by date
- `DELETE /api/attendance/:id` - Delete attendance record

### Employees
- `POST /api/employees` - Create employee
- `GET /api/employees` - Get all employees

### Health Check
- `GET /api/health` - Server status

## Setup

1. Install dependencies:
```bash
npm install