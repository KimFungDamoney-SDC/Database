const db = require('../questionsdb/index.js');

const controllers = {
  getQuestions: (req, res) => {
    let queryString = `select * from questions where product_id=${req.params.id}`;
    db.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results.rows)
      }
    })
  },
  postQuestions: (req, res) => {
    let { body, username, email } = req.body;
    let queryString = `insert into questions (question_body, asker_name, asker_email) values ("${body}", "${username}", "${email}") where product_id=${req.params.id}`;
    db.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results)
      }
    })
  },

}

module.exports = controllers;