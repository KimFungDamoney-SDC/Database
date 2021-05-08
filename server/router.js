const router = require('express').Router();
const controllers = require('./controllers.js');

router
  .route('/reviews')
  .get(controllers.getAllReviews)
  .post(controllers.postReviews)

router
  .route('/reviews/meta')
  .get(controllers.getMetaReviews)

router
  .route('/reviews/:review_id/helpful')
  .put(controllers.updateHelpfulness)

router
  .route('/reviews/:review_id/report')
  .put(controllers.updateReport)

module.exports = router;