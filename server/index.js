const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { Client, Query } = require('pg');
const router = require('express').Router();
//This is Products Service don't MERGE with MASTER

const app = express();
const PORT = 4242;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});

const client = new Client({
  host: 'ec2-204-236-163-202.us-west-1.compute.amazonaws.com',
  port: 5432,
  database: 'sdc_products',
  user: 'sueannkim',
  password: 'ChoosePassword'
});

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to Database!')
  }
});

app.get('/products', (req, response) => {
  let page = req.query.page || 1;
  let count = req.query.count || 5;

  const offset = (page - 1) * count;
  const offsetStr = offset ? `OFFSET ${offset}` : '' ;

  client.query(`SELECT * from product LIMIT ${count} ${offsetStr}`, (err, res) => {
    if (err) console.log(err);
    response.send(res.rows);
  })
});

app.get('/products/:product_id', (req, res) => {
  let {product_id} = req.params;
  console.time('product')
  client.query(`SELECT * from product WHERE id = ${product_id}`, (err, result) => {
    if (err) console.log(err);
    let resultToChange = result.rows[0];

    client.query(`select json_build_object('feature', f.feature, 'value', f.value) from feature f WHERE product_id = ${product_id}`, (err, {rows}) => {
      resultToChange.features = [];
      rows.forEach(feature =>
        resultToChange.features.push(feature.json_build_object));
      res.send(resultToChange);
      console.timeEnd('product');
    })
  })

});

app.get('/products/:product_id/styles', (req, res) => {
  let {product_id} = req.params;
  console.time('styles');

  client.query(`SELECT * from styles WHERE product_id = ${product_id}`, (err, result) => {
    if (err) res.send(err);
    let styles = result.rows;
    styles.forEach((item, ind) => {
      item.photos = [];
      client.query(`SELECT url, thumbnail_url from photos WHERE style_id = ${item.id}`, (err, photoResult) => {
        if (err) console.log(err)
        item.photos = item.photos.concat(photoResult.rows);
        if (ind === styles.length -1) {
          res.send(styles);
          console.timeEnd('styles')
        }
      })
    })
  })
});

app.get('/products/:product_id/related', (req, res) => {
  let {product_id} = req.params;
  client.query(`SELECT * from related WHERE current = ${product_id}`, (err, result) => {
    if (err) res.send(err);
    let finalResult = [];
    result.rows.forEach(item => {
      finalResult.push(item.related)
    });
    res.send(finalResult);
  })
});

app.get('/loaderio-d386834c0339b7c4ffe3f2c6c9a33d95.txt', (req, res) => {
  res.send('loaderio-d386834c0339b7c4ffe3f2c6c9a33d95');
})

app.get('loaderio-4359158a7f33d70a989baa93a442e894.txt', (req, res) => {
  res.send('loaderio-4359158a7f33d70a989baa93a442e894');
})
// router.route('/cart')
//   .get() //200 ok
//   .post(); //201 created sku_id: qty

