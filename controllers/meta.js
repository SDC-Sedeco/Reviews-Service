var models = require('../models/index.js');

module.exports = {
  get: function(req, res) {
    if (req.query.product_id) {
      let returnObject = {
        product_id: req.query.product_id.toString(),
        ratings: {},
        recommended: {
          0: 0,
          1: 0
        },
        characteristics: {}
      };
      models.meta.get(req.query.product_id)
        .then((metaResults) => {
          metaResults.forEach(result => {
            returnObject.ratings[result.rating] = result.count;
            returnObject.recommended["0"] += parseInt(result["Recommend_False"]);
            returnObject.recommended["1"] += parseInt(result["Recommend_True"]);
          });
          res.status(200).send(returnObject);

        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });
    } else {
      res.sendStatus(400);
    }
  }
}