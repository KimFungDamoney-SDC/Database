const router = require('express').Router();
const controllers = require('./controllers.js');

router
  .route('/questions/:id')
  .get(controllers.getQuestions)
  .post(controllers.postQuestions)
//   .put(controllers.helpfulQuestion)

// router
//   .route('/answers')
//   .get(controllers.getAnswers)
//   .post(controllers.postAnswer)
//   .put(controllers.helpfulAnswer)

// router
//   .route('/answers/:id')
//   .put(controllers.reportAnswer)


  module.exports = router;