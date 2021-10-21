var db = require('../db/index.js');

module.exports = {
  reviews: {
    get: function() {},
    post: function() {
      return new Promise((resolve, reject) => {
        const connection = db.generateConnection();
        connection.connect();
        var query = `INSERT INTO characteristics (id, product_id, name) VALUES (1, 11111, "TestName")`;
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