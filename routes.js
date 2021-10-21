const controller = require('./controllers');
var router = require('express').Router();

router.get('/reviews', controller.reviews.get);
router.get('/reviews/meta', controller.meta.get);

router.post('/reviews', controller.reviews.post);
router.put('/reviews/:review_id/helpful', controller.reviews.helpful);
router.put('/reviews/:review_id/report', controller.reviews.report);

module.exports = router;