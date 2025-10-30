const Attendance = require('../models/Attendance');

class AttendanceService {
  static async markAttendance(attendanceData) {
    console.log('AttendanceService - markAttendance:', attendanceData);
    
    // Validate required fields
    const { employeeName, employeeID, date, status } = attendanceData;
    
    if (!employeeName || !employeeID || !date || !status) {
      throw new Error('All fields are required');
    }

    if (!['Present', 'Absent'].includes(status)) {
      throw new Error('Status must be either "Present" or "Absent"');
    }

    const result = await Attendance.create(attendanceData);
    console.log('AttendanceService - result:', result);
    return result;
  }

  static async getAllAttendance() {
    console.log('AttendanceService - getAllAttendance');
    const attendance = await Attendance.findAll();
    console.log('AttendanceService - found records:', attendance.length);
    return attendance;
  }

  static async getAttendanceByEmployeeID(employeeID) {
    if (!employeeID) {
      throw new Error('Employee ID is required');
    }
    return await Attendance.findByEmployeeID(employeeID);
  }

  static async getAttendanceByDate(date) {
    if (!date) {
      throw new Error('Date is required');
    }
    return await Attendance.findByDate(date);
  }

  static async deleteAttendance(id) {
    if (!id) {
      throw new Error('Attendance ID is required');
    }
    const result = await Attendance.delete(id);
    return result;
  }
}

module.exports = AttendanceService;