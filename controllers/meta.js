var models = require('../models/index.js');

// Import helper function to check cache first
const { getOrSetCache } = require('../db/redis.js');

module.exports = {
  get: async function(req, res) {
    if (req.query.product_id) {
      const metaData = getOrSetCache(`meta?product_id=${req.query.product_id}`, () => {
        return new Promise((resolve, reject) => {
          let returnObject = {
            product_id: req.query.product_id.toString(),
            ratings: {},
            recommended: {
              0: 0,
              1: 0
            },
            characteristics: {}
          };
          models.meta.get(req.query.product_id).then((metaResults) => {
            metaResults.forEach(result => {
              returnObject.ratings[result.rating] = result.count;
              returnObject.recommended["0"] += parseInt(result["Recommend_False"]);
              returnObject.recommended["1"] += parseInt(result["Recommend_True"]);
            });
            models.characteristics.get(req.query.product_id).then((charResults) => {
              charResults.forEach(characteristic => {
                returnObject.characteristics[characteristic.name] = {
                  id: characteristic.characteristic_id,
                  value: characteristic.value
                }
              });
              resolve(returnObject);
            })
          })
          .catch((err) => {
            reject(400);
          });
        })
        .catch((errorCode) => {
          res.sendStatus(errorCode);
        });
      });

      metaData.then(data => res.status(200).send(data));
    } else {
      res.sendStatus(400);
    }
  }
}