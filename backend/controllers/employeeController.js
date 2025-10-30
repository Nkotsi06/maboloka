const EmployeeService = require('../services/employeeService');

const employeeController = {
  createEmployee: async (req, res) => {
    try {
      console.log('createEmployee - Request body:', req.body);
      
      const { employeeID, employeeName } = req.body;
      
      if (!employeeID || !employeeName) {
        return res.status(400).json({
          success: false,
          message: 'Employee ID and Name are required'
        });
      }

      const result = await EmployeeService.createEmployee({
        employeeID,
        employeeName
      });

      res.status(201).json({
        success: true,
        message: 'Employee created successfully',
        data: { id: result.id, employeeID, employeeName }
      });
    } catch (error) {
      console.error('createEmployee - Error:', error.message);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  },

  getAllEmployees: async (req, res) => {
    try {
      console.log('getAllEmployees - Fetching all employees');
      const employees = await EmployeeService.getAllEmployees();
      
      res.status(200).json({
        success: true,
        data: employees
      });
    } catch (error) {
      console.error('getAllEmployees - Error:', error.message);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
};

module.exports = employeeController;