const db = require('../questionsdb/index.js');

const controllers = {
  getQuestions: (req, res) => {
    let queryString = `select * from questions where product_id=${req.params.product_id} order by helpfulness desc`;
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
    const product_id = req.body.product_id;
    const queryString = `insert into questions
    (product_id, body, date, name, email, reported, helpfulness)
    values
    ($1, $2, current_timestamp, $3, $4, false, 0)`;
    const values = [product_id, req.body.body, req.body.name, req.body.email]
    db.query(queryString, values, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results)
      }
    })
  },
  helpfulQuestion: (req, res) => {
    let queryString = `update questions set helpfulness=helpfulness+1 where id=${req.params.question_id}`;
    db.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results)
      }
    })
  },
  getAnswers: (req, res) => {
    let queryString = `select * from answers where question_id=${req.params.question_id} order by helpfulness desc`;
    db.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results.rows)
      }
    })
  },
  postAnswer: (req, res) => {
    const queryString = `insert into answers
    (question_id, body, date, name, email, reported, helpfulness)
    values
    ($1, $2, current_timestamp, $3, $4, false, 0)`;
    const values = [req.body.question_id, req.body.body, req.body.name, req.body.email]
    db.query(queryString, values, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results)
      }
    })
  },
  helpfulAnswer: (req, res) => {
    let queryString = `update answers set helpfulness=helpfulness+1 where id=${req.params.answer_id}`;
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