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
            res.sendStatus(400);
          })
      } else {
        res.sendStatus(400);
      }
    },
    post: function(req, res) {
      if (typeof rating === 'string') {

      }
      if (req.query.product_id !== undefined &&
          req.query.rating !== undefined &&
          req.query.summary !== undefined &&
          req.query.body !== undefined &&
          req.query.recommend !== undefined &&
          req.query.name !== undefined &&
          req.query.email !== undefined &&
          req.query.photos !== undefined &&
          req.query.characteristics !== undefined) {
        models.reviews.post(req.query)
          .then(() => {
            res.sendStatus(201);
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      } else {
        console.log(req.query);
        res.sendStatus(400);
      }
    },
    helpful: function() {},
    report: function() {}
  },
  meta: {
    get: function() {}
  }
};