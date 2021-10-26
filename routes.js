const controller = require('./controllers');
var router = require('express').Router();

router.get('/', controller.reviews.get);
router.get('/meta', controller.meta.get);

router.post('/', controller.reviews.post);
router.put('/:review_id/helpful', controller.reviews.helpful);
router.put('/:review_id/report', controller.reviews.report);

module.exports = router;