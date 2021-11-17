const controller = require('./controllers');
var router = require('express').Router();

router.get('/', controller.reviews.get);
router.get('/meta', controller.meta.get);
router.get('/loaderio*', (req, res) => {
  res.status(200).send('loaderio-53bd3fe83f6e107449f0c80c9da4d8d1');
});

router.post('/', controller.reviews.post);
router.put('/:review_id/helpful', controller.reviews.helpful);
router.put('/:review_id/report', controller.reviews.report);

module.exports = router;