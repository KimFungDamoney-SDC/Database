const db = require('../questionsdb/index.js');

const controllers = {
  getQuestions: (req, res) => {
    let queryString = `select * from questions where product_id=${req.params.product_id} order by helpful desc`;
    db.query(queryString, (err, results) => {
      console.time();
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results.rows)
        console.timeEnd();
      }
    })
  },
  postQuestion: (req, res) => {
    let { body, username, email } = req.body;
    let queryString = `insert into questions (product_id, question_body, asker_name, asker_email) values (${req.params.product_id}, "${body}", "${username}", "${email}")`;
    db.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results)
      }
    })
  },
  helpfulQuestion: (req, res) => {
    let queryString = `update questions set helpful=helpful+1 where id=${req.params.question_id}`;
    db.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results)
      }
    })
  },
  getAnswers: (req, res) => {
    let queryString = `select * from answers where question_id=${req.params.question_id} order by helpful desc`;
    db.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results.rows)
      }
    })
  },
  postAnswer: (req, res) => {
    let { body, username, email } = req.body;
    let queryString = `insert into answers (question_id, answer_body, answerer_name, answerer_email) values (${req.params.question_id}, "${body}", "${username}", "${email}")`;
    db.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results)
      }
    })
  },
  helpfulAnswer: (req, res) => {
    let queryString = `update answers set helpful=helpful+1 where id=${req.params.answer_id}`;
    db.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results)
      }
    })
  },
  reportAnswer: (req, res) => {
    let queryString = `update answers set reported=true where id=${req.params.answer_id}`;
    db.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results)
      }
    })
  }
}

module.exports = controllers;