var mysql = require('mysql');
// const Sequelize = require('sequelize');
const secret = require('../secret.json');

module.exports.generateConnection = () => {
  return mysql.createConnection({
    host: 'localhost',
    user: 'sdcService',
    password: secret.sqlPwd,
    database: 'reviewsData'
  });
};

// module.exports.generateConnection = () => {
//   return new Sequelize('reviewsData', 'sdcService', secret.sqlPwd);
// }

// module.exports.Reviews = module.exports.generateConnection().define('reviews', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   rating: Sequelize.INTEGER,
//   summary: Sequelize.STRING,
//   recommend: Sequelize.BOOLEAN,
//   response: Sequelize.STRING,
//   body: Sequelize.STRING,
//   date: Sequelize.STRING,
//   reviewer_name: Sequelize.STRING,
//   helpfulness: Sequelize.INTEGER
// }, {
//   timestamps: false
// });

// module.exports.Characteristics = module.exports.generateConnection().define('characteristics', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   product_id: {

//   }
// })