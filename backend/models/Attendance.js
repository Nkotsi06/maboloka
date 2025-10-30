const db = require('../config/db');

class Attendance {
  static async createTable() {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS attendance (
          id INT AUTO_INCREMENT PRIMARY KEY,
          employeeName VARCHAR(255) NOT NULL,
          employeeID VARCHAR(100) NOT NULL,
          date DATE NOT NULL,
          status ENUM('Present', 'Absent') NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      await db.execute(createTableQuery);
      console.log('✅ Attendance table ready');
    } catch (error) {
      console.error('❌ Error creating attendance table:', error.message);
      throw error;
    }
  }

  static async create(attendanceData) {
    const { employeeName, employeeID, date, status } = attendanceData;
    
    console.log('Creating attendance record:', { employeeName, employeeID, date, status });
    
    if (!employeeName || !employeeID || !date || !status) {
      throw new Error('All fields are required: employeeName, employeeID, date, status');
    }

    if (!['Present', 'Absent'].includes(status)) {
      throw new Error('Status must be either "Present" or "Absent"');
    }

    const query = `
      INSERT INTO attendance (employeeName, employeeID, date, status) 
      VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await db.execute(query, [employeeName, employeeID, date, status]);
    return result;
  }

  static async findAll() {
    const query = 'SELECT * FROM attendance ORDER BY date DESC, created_at DESC';
    const [rows] = await db.execute(query);
    return rows;
  }

  static async findByEmployeeID(employeeID) {
    if (!employeeID) {
      throw new Error('Employee ID is required');
    }
    
    const query = 'SELECT * FROM attendance WHERE employeeID = ? ORDER BY date DESC';
    const [rows] = await db.execute(query, [employeeID]);
    return rows;
  }

  static async findByDate(date) {
    if (!date) {
      throw new Error('Date is required');
    }
    
    const query = 'SELECT * FROM attendance WHERE date = ? ORDER BY employeeName';
    const [rows] = await db.execute(query, [date]);
    return rows;
  }

  static async delete(id) {
    if (!id) {
      throw new Error('Attendance ID is required');
    }
    
    const query = 'DELETE FROM attendance WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    
    if (result.affectedRows === 0) {
      throw new Error('Attendance record not found');
    }
    
    return result;
  }
}

module.exports = Attendance;