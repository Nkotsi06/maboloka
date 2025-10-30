const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Mark attendance
router.post('/attendance', attendanceController.markAttendance);

// Get all attendance records
router.get('/attendance', attendanceController.getAllAttendance);

// Get attendance by employee ID
router.get('/attendance/employee/:employeeID', attendanceController.getAttendanceByEmployee);

// Get attendance by date
router.get('/attendance/date/:date', attendanceController.getAttendanceByDate);

// Delete attendance record
router.delete('/attendance/:id', attendanceController.deleteAttendance);

module.exports = router;