var models = require('../models/index.js');

module.exports = {
  reviews: {
    get: function(req, res) {
      // test code
      console.log('Getting in the controllers!');
      models.reviews.get()
        .then((results) => {
          console.log(results);
          res.statusCode = '201';
          res.send(results);
        })
        .catch((err) => {
          res.status(401).send(err);
        })
    },
    post: function(req, res) {
      models.reviews.post()
        .then(() => {
          res.statusCode = '201';
          res.end();
        })
        .catch((err) => {
          console.log(err);
          res.statusCode = '401';
          res.end();
        })
    },
    helpful: function() {},
    report: function() {}
  },
  meta: {
    get: function() {}
  }
};