var mysql = require('mysql2');

const connection = mysql.createConnection({
  connectionLimit: process.env.DB_CONNECTION_LIMIT || 100,
  host: process.env.DB_HOST || 'EMPTY_HOST',
  user: process.env.DB_USER || 'EMPTY_USER',
  password: process.env.DB_PW || 'EMPTY_PW',
  database: 'reviewsData'
});
connection.connect();

module.exports = connection;