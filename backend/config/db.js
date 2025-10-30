const mysql = require('mysql2');
require('./dotenv.config');

console.log('🔧 Connecting to MySQL database...');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'attendance_tracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000,
  acquireTimeout: 60000,
  timezone: '+00:00'
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Error connecting to MySQL database:');
    console.error('Error:', err.message);
    console.error('Code:', err.code);
    
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Check your MySQL username and password in .env file');
    } else if (err.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Database does not exist. Create it first.');
    } else if (err.code === 'ECONNREFUSED') {
      console.log('💡 MySQL server is not running or not accessible');
    }
    
    return;
  }
  
  console.log('✅ Connected to MySQL database successfully!');
  console.log('📊 Database:', connection.config.database);
  connection.release();
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('MySQL pool error:', err);
});

// Export the pool promise interface
module.exports = pool.promise();