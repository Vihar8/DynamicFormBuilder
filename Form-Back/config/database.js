const mysql = require('mysql2');
const env = process.env.NODE_ENV || 'development';
const config = require('./config.json')[env];

const pool = mysql.createPool({
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database,
  waitForConnections: true,
  connectionLimit: config.pool.max || 10,
  queueLimit: 0
});
console.log("test", pool)
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Unable to connect to the database:', err);
  } else {
    console.log('Database connection established successfully.');
    connection.release();
  }
});

module.exports = pool.promise(); 