var models = require('../models/index.js');

module.exports = {
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
              let returnPackage = {
                "product_id": params.product_id.toString(),
                "page": params.page,
                "count": params.count,
                "results": reviewResults.map((review) => {
                  let photos = [];

                  photosResults.filter(photo => photo.review_id === review.review_id).forEach(photo => {
                    if (photo.photo_id !== null) {
                      photos.push({
                        id: photo.photo_id,
                        url: photo.photo_url
                      });
                    }
                  })

                  return {...review, recommend: review.recommend > 0, photos: photos};
                })
              };
              res.status(200).send(returnPackage);
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
  helpful: function(req, res) {
    if (req.query.review_id !== undefined) {
      models.reviews.helpful(req.query.review_id)
        .then(() => {
          res.sendStatus(204);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });;
    }
  },
  report: function(req, res) {
    if (req.query.review_id !== undefined) {
      models.reviews.report(req.query.review_id)
        .then(() => {
          res.sendStatus(204);
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(400);
        });;
    }
  }
}