var models = require('../models/index.js');

module.exports = {
  reviews: {
    get: function(req, res) {
      res.statusCode = '201';
      res.end();
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