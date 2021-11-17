var mysql = require('mysql2');

module.exports.generateConnection = () => {
  return mysql.createConnection({
    host: process.env.DB_HOST || 'EMPTY_HOST',
    user: process.env.DB_USER || 'EMPTY_USER',
    password: process.env.DB_PW || 'EMPTY_PW',
    database: 'reviewsData'
  });
};