const Employee = require('../models/Employee');

class EmployeeService {
  static async createEmployee(employeeData) {
    console.log('EmployeeService - createEmployee:', employeeData);
    
    const { employeeID, employeeName } = employeeData;
    
    if (!employeeID || !employeeName) {
      throw new Error('Employee ID and Name are required');
    }

    const result = await Employee.create(employeeData);
    console.log('EmployeeService - result:', result);
    return result;
  }

  static async getAllEmployees() {
    console.log('EmployeeService - getAllEmployees');
    const employees = await Employee.findAll();
    console.log('EmployeeService - found employees:', employees.length);
    return employees;
  }
}

module.exports = EmployeeService;