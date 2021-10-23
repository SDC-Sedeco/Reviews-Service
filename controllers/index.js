var models = require('../models/index.js');

module.exports = {
  reviews: {
    get: function(req, res) {
      if (req.query.sort && req.query.product_id) {
        models.reviews.get(req.query)
          .then((results) => {
            res.status(200).send(results);
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(401);
          })
      } else {
        res.sendStatus(400);
      }
    },
    post: function(req, res) {
      models.reviews.post()
        .then(() => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(401);
        })
    },
    helpful: function() {},
    report: function() {}
  },
  meta: {
    get: function() {}
  }
};