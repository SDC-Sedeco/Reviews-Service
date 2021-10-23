var db = require('../db/index.js');

module.exports = {
  reviews: {
    get: function(queryParams) {
      const count = queryParams.count || 5;
      const page = ((queryParams.page || 1) - 1) * count;
      return new Promise((resolve, reject) => {
        const connection = db.generateConnection();
        connection.connect();
        var query = `SELECT * FROM reviews
        WHERE product_id = ${queryParams.product_id}
        LIMIT ${page}, ${count}`;
        connection.query(query, [], function(err, results) {
          err ? reject(err) : resolve(results);
        });
        connection.end();
      });
    },
    post: function() {
      return new Promise((resolve, reject) => {
        const connection = db.generateConnection();
        connection.connect();
        var query = `INSERT INTO reviews (id, product_id, rating, summary, body, reviewer_name) VALUES (10, 11111, 4, "Its ok", "This is a body", "Logan")`;
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