var db = require('../db/index.js');

module.exports = {
  reviews: {
    get: function() {
      console.log('Getting in the model!');
      return new Promise((resolve, reject) => {
        const connection = db.generateConnection();
        connection.connect();
        var query = `SELECT * FROM characteristics`;
        connection.query(query, [], function(err, results) {
          // console.log(err, results);
          err ? reject(err) : resolve(results);
        });
        connection.end();
      });
    },
    post: function() {
      return new Promise((resolve, reject) => {
        const connection = db.generateConnection();
        connection.connect();
        var query = `INSERT INTO characteristics (id, product_id, name) VALUES (2, 22222, "TestName2")`;
        connection.query(query, [], function(err) {
          err ? reject(err) : resolve();
        });
        connection.end();
      })
    },
    helpful: function() {},
    report: function() {}
  },
  meta: {
    get: function() {}
  }
};