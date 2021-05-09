const router = require('express').Router();
const controllers = require('./controllers.js');

router
  .route('/questions/:product_id')
  .get(controllers.getQuestions)
  .post(controllers.postQuestion)

router
  .route('/questions/helpful/:question_id')
  .put(controllers.helpfulQuestion)

router
  .route('/answers/:question_id')
  .get(controllers.getAnswers)
  .post(controllers.postAnswer)
router
  .route('/answers/helpful/:answer_id')
  .put(controllers.helpfulAnswer)

router
  .route('/answers/report/:answer_id')
  .put(controllers.reportAnswer)


  module.exports = router;