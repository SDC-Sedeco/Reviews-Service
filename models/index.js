var db = require('../db/index.js');

module.exports = {
  reviews: {
    get: function(queryParams) {
      const count = queryParams.count;
      const page = (queryParams.page - 1) * count;
      return new Promise((resolve, reject) => {
        const connection = db.generateConnection();
        connection.connect();
        var query = `SELECT r.id AS review_id,
        r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness
        FROM reviews AS r
        WHERE r.product_id = ${queryParams.product_id}
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
        // Log the review itself
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
        // Get the new id of the review we just posted
        return new Promise((resolve, reject) => {
          connection.query(`SELECT LAST_INSERT_ID()`, [], function(err, results) {
            err ? reject(err) : resolve(results[0]['LAST_INSERT_ID()']);
          });
        });
      }).then((lastReviewId) => {
        // Save the characteristics (if any) with the review id
        return new Promise((resolve, reject) => {
          let insertValues = [];
          const characteristics = queryParams.characteristics;

          for (const [key, value] of Object.entries(JSON.parse(characteristics))) {
            insertValues.push(`(${lastReviewId}, ${key}, ${parseInt(value)})`)
          }

          if (insertValues.length > 0) {
            const charReviewInsertQuery = `INSERT INTO characteristics_reviews (review_id, characteristic_id, value) VALUES ${insertValues.join(', ')}`;
            connection.query(charReviewInsertQuery, [], function(err, results) {
              err ? reject(err) : resolve(lastReviewId);
            });
          } else {
            resolve(lastReviewId);
          }
        });
      }).then((lastReviewId) => {
        // Save the photos (if any) with the review id
        return new Promise((resolve, reject) => {
          let insertValues = [];
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
    get: function(product_id) {}
  },
  characteristics_reviews: {
    get: function(review_id) {}
  },
  photos: {
    get: function(product_id) {
      return new Promise((resolve, reject) => {
        const connection = db.generateConnection();
        connection.connect();
        // var query = `SELECT * FROM photos
        // WHERE review_id = ${review_id}`;
        var query = `SELECT r.product_id, r.id AS review_id, p.url AS photo_url, p.id AS photo_id
        FROM reviews AS r
        LEFT JOIN photos AS p
        ON r.id = p.review_id
        WHERE product_id = ${product_id}
        ORDER BY photo_id`;
        connection.query(query, [], function(err, results) {
          err ? reject(err) : resolve(results);
        });
        connection.end();
      })
    }
  }
};