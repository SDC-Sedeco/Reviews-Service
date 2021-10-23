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
    post: function(queryParams) {
      const connection = db.generateConnection();
      connection.connect();

      return new Promise((resolve, reject) => {
        let reviewInsertQuery = `INSERT INTO reviews
        (product_id, rating, summary, body, reviewer_name, email)
        VALUES (
          ${queryParams.product_id},
          ${typeof queryParams.rating === 'number' ? queryParams.rating : parseInt(queryParams.rating)},
          ${queryParams.summary},
          ${queryParams.body},
          ${queryParams.name},
          ${queryParams.email}
        )`;
        connection.query(reviewInsertQuery, [], function(err) {
          err ? reject(err) : resolve();
        });
      }).then(() => {
        return new Promise((resolve, reject) => {
          connection.query(`SELECT LAST_INSERT_ID()`, [], function(err, results) {
            err ? reject(err) : resolve(results[0]['LAST_INSERT_ID()']);
          });
        });
      }).then((lastReviewId) => {
        // console.log(lastReviewId);
        return new Promise((resolve, reject) => {
          let insertValues = [];
          // console.log(queryParams.characteristics);
          const characteristics = queryParams.characteristics;
          // const characteristics = JSON.parse(queryParams.characteristics);

          for (const [key, value] of Object.entries(JSON.parse(characteristics))) {
            insertValues.push(`(${lastReviewId}, ${key}, ${parseInt(value)})`)
          }

          if (insertValues.length > 0) {
            // console.log(insertValues.join(', '));
            const charReviewInsertQuery = `INSERT INTO characteristics_reviews (review_id, characteristic_id, value) VALUES ${insertValues.join(', ')}`;
            connection.query(charReviewInsertQuery, [], function(err, results) {
              err ? reject(err) : resolve(lastReviewId);
            });
          } else {
            resolve(lastReviewId);
          }
        });
      }).then((lastReviewId) => {
        return new Promise((resolve, reject) => {
          let insertValues = [];
          // console.log(queryParams.photos);
          const photos = JSON.parse(queryParams.photos);

          for (let k = 0; k < photos.length; k++) {
            insertValues.push(`(${lastReviewId}, \"${photos[k]}\")`)
          }

          if (insertValues.length > 0) {
            const photosInsertQuery = `INSERT INTO photos (review_id, url) VALUES ${insertValues.join(', ')}`;
            connection.query(photosInsertQuery, [], function(err, results) {
              err ? reject(err) : resolve();
            });
          } else {
            resolve();
          }
        })
      }).then(() => {
        connection.end();
      }).catch((err) => {
        console.log(err);
        connection.end();
      });
    },
    helpful: function() {},
    report: function() {}
  },
  meta: {
    get: function() {}
  }
};