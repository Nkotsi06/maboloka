const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// Create employee
router.post('/employees', employeeController.createEmployee);

// Get all employees
router.get('/employees', employeeController.getAllEmployees);

module.exports = router;