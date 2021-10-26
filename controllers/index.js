var models = require('../models/index.js');

module.exports = {
  reviews: {
    get: function(req, res) {
      if (req.query.sort && req.query.product_id) {
        const params = {
          product_id: req.query.product_id,
          sort: req.query.sort,
          page: Math.max(parseInt(req.query.page) || 1, 1),
          count: parseInt(req.query.count) || 5
        };

        models.reviews.get(params)
          .then((reviewResults) => {
            models.photos.get(params.product_id)
              .then((photosResults) => {
                let package = {
                  "product_id": params.product_id.toString(),
                  "page": params.page,
                  "count": params.count,
                  "results": reviewResults.map((review) => {
                    let photos = [];

                    photosResults.filter(photo => photo.review_id === review.review_id).forEach(photo => {
                      photos.push({
                        id: photo.photo_id,
                        url: photo.photo_url
                      });
                    })

                    return {...review, recommend: review.recommend > 0, photos: photos};
                  })
                };
                res.status(200).send(package);
              })
              .catch((err) => {
                console.log(err);
                res.sendStatus(400);
              });
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
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