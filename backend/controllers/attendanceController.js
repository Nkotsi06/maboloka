const AttendanceService = require('../services/attendanceService');

const attendanceController = {
  markAttendance: async (req, res) => {
    try {
      console.log('markAttendance - Request body:', req.body);
      
      const { employeeName, employeeID, date, status } = req.body;
      
      if (!employeeName || !employeeID || !date || !status) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required: employeeName, employeeID, date, status'
        });
      }

      const result = await AttendanceService.markAttendance({
        employeeName,
        employeeID,
        date,
        status
      });

      res.status(201).json({
        success: true,
        message: 'Attendance marked successfully',
        data: { id: result.id, employeeName, employeeID, date, status }
      });
    } catch (error) {
      console.error('markAttendance - Error:', error.message);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  getAllAttendance: async (req, res) => {
    try {
      console.log('getAllAttendance - Fetching all attendance');
      const attendance = await AttendanceService.getAllAttendance();
      
      res.status(200).json({
        success: true,
        data: attendance
      });
    } catch (error) {
      console.error('getAllAttendance - Error:', error.message);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  },

  getAttendanceByEmployee: async (req, res) => {
    try {
      const { employeeID } = req.params;
      const attendance = await AttendanceService.getAttendanceByEmployeeID(employeeID);
      
      res.status(200).json({
        success: true,
        data: attendance
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  getAttendanceByDate: async (req, res) => {
    try {
      const { date } = req.params;
      const attendance = await AttendanceService.getAttendanceByDate(date);
      
      res.status(200).json({
        success: false,
        data: attendance
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  deleteAttendance: async (req, res) => {
    try {
      const { id } = req.params;
      await AttendanceService.deleteAttendance(id);
      
      res.status(200).json({
        success: true,
        message: 'Attendance record deleted successfully'
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = attendanceController;