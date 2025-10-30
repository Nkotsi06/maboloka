const express = require('express');
const cors = require('cors');
require('./config/dotenv.config');

const attendanceRoutes = require('./routes/attendanceRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');
const Attendance = require('./models/Attendance');
const Employee = require('./models/Employee');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Initialize database tables
const initializeDatabase = async () => {
  try {
    console.log('🔄 Initializing database tables...');
    await Attendance.createTable();
    await Employee.createTable();
    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
  }
};

// Routes
app.use('/api', attendanceRoutes);
app.use('/api', employeeRoutes);

// Health check route
app.get('/api/health', async (req, res) => {
  try {
    const db = require('./config/db');
    await db.execute('SELECT 1');
    
    res.status(200).json({
      success: true,
      message: 'Server is running with MySQL database',
      timestamp: new Date().toISOString(),
      database: 'MySQL'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
      error: error.message
    });
  }
});

// Test data route
app.get('/api/test-data', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    const attendance = await Attendance.findAll();
    
    res.json({
      success: true,
      data: {
        employeesCount: employees.length,
        attendanceCount: attendance.length,
        employees: employees.slice(0, 3),
        attendance: attendance.slice(0, 3)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// Start server
const startServer = async () => {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log('\n🎉 ==================================');
      console.log('🚀 Server started successfully!');
      console.log(`📍 Port: ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
      console.log(`💾 Database: MySQL`);
      console.log(`📊 Database Name: ${process.env.DB_NAME}`);
      console.log(`🔗 API Base: http://localhost:${PORT}/api`);
      console.log('✅ ==================================\n');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();