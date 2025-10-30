const db = require('../config/db');

class Employee {
  static async createTable() {
    try {
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS employees (
          id INT AUTO_INCREMENT PRIMARY KEY,
          employeeID VARCHAR(100) UNIQUE NOT NULL,
          employeeName VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      await db.execute(createTableQuery);
      console.log('✅ Employees table ready');
    } catch (error) {
      console.error('❌ Error creating employees table:', error.message);
      throw error;
    }
  }

  static async create(employeeData) {
    const { employeeID, employeeName } = employeeData;
    
    console.log('Creating employee:', { employeeID, employeeName });
    
    if (!employeeID || !employeeName) {
      throw new Error('Employee ID and Name are required');
    }

    const query = 'INSERT INTO employees (employeeID, employeeName) VALUES (?, ?)';
    
    try {
      const [result] = await db.execute(query, [employeeID, employeeName]);
      return result;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('Employee ID already exists');
      }
      throw error;
    }
  }

  static async findAll() {
    const query = 'SELECT * FROM employees ORDER BY employeeName';
    const [rows] = await db.execute(query);
    return rows;
  }

  static async findByID(employeeID) {
    if (!employeeID) {
      throw new Error('Employee ID is required');
    }
    
    const query = 'SELECT * FROM employees WHERE employeeID = ?';
    const [rows] = await db.execute(query, [employeeID]);
    return rows[0];
  }
}

module.exports = Employee;