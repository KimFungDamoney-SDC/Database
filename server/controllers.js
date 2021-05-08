const client = require('../database/index.js')

const controllers = {

  getAllReviews: (req, res) => {
    const queryString = `SELECT *
                         FROM reviews
                         INNER JOIN photos
                         ON reviews.id = photos.review_id
                         LIMIT 10`
    client.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },

  getMetaReviews: (req, res) => {
    const queryString = `SELECT *
                         FROM characteristics
                         INNER JOIN characteristic_reviews
                         ON characteristics.product_id = characteristic_reviews.product_id
                         LIMIT 10`
    client.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },

  postReviews: (req, res) => {
    let { product_id, rating, summary, body, recommend, reviewer_name, reviewer_email, photos, characteristics } = req.body;
    const queryString = `INSERT INTO reviews
                        (product_id, rating, summary, body, recommend, reviewer_name, reviewer_email, photos, characteristics),
                         VALUES (${product_id}, ${rating}, '${summary}', '${body}', '${recommend}', '${reviewer_name}', '${reviewer_email}',      '${photos}' ${characteristics})`
                         console.log(req.body)
    client.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(results)
      }
    });
  },

  updateHelpfulness: (req, res) => {
    const queryString = `UPDATE reviews
                         SET helpfulness=${req.body.helpfulness}
                         WHERE id=${req.params.id}`
    client.query(queryString, (err, results) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  },

  updateReport: (req, res) => {
    const queryString = `UPDATE reviews
                         SET reported=${req.body.reported}
                         WHERE id=${req.params.id}`
    client.query(queryString, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(results);
      }
    });
  }
}


module.exports = controllers;