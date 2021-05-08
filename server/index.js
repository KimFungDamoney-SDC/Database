const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { Pool, Client, Query } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const csv = require('csv-parser');
// const productRoutes = require('./productRoutes.js');
const router = require('express').Router();

const tables = [
  {
    table : 'product',
    path : path.join(__dirname, '../db_products/product.csv'),
    cmd: `COPY product FROM STDIN DELIMITER ',' CSV HEADER`
  },
  {
    table: 'styles',
    path: path.join(__dirname, '../db_products/styles.csv'),
    cmd: `COPY styles FROM STDIN DELIMITER ',' CSV HEADER`
  },
  {
    table: 'sku',
    path: path.join(__dirname, '../db_products/skus.csv'),
    cmd: `COPY sku FROM STDIN DELIMITER ',' CSV HEADER`
  },
  {
    table: 'photos',
    path: path.join(__dirname, '../db_products/photos.csv'),
    cmd: `COPY photos FROM STDIN DELIMITER ',' CSV HEADER`
  },
  {
    table: 'feature',
    path: path.join(__dirname, '../db_products/features.csv'),
    cmd: `COPY feature FROM STDIN WITH (FORMAT CSV)`
  },
  {
    table: 'related',
    path: path.join(__dirname, '../db_products/related.csv'),
    cmd: `COPY related FROM STDIN DELIMITER ',' CSV HEADER`
  }];

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'sdc_products',
  username: 'sueannkim',
  password: 'ChoosePassword'
});

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('connected to Database!')
  }
});

const executeQuery = (tables) => {
  const execute = (target, callback) => {
    client.query(`Truncate feature`, (err) => {
      if (err) {
        client.end();
        console.log('error truncating table', err);
        callback(err)
      } else {
        console.log('Truncated');
        callback(null, target)
      }
    });
  }
  tables.forEach((entry) => {
    execute(entry.table, (err) => {
      if(err) return console.log(err);

      const stream = client.query(copyFrom(`${entry.cmd}`));
      const fileStream = fs.createReadStream(`${entry.path}`);

      console.time(`${entry.table}`);

      fileStream.pipe(stream)
      fileStream.on('end', () => {
        console.log(`Completed loading data into ${entry.table}`);
        console.timeEnd(`${entry.table}`);
      })
      stream.on('error', (error) => {
        console.log(`Error during copying: ${error}`)
      })
      fileStream.on('error', (error) => {
        console.log(`Error loading to table: ${entry.table}`)
      })
    })
  })
}


//executeQuery(tables);
app.get('/products', (req, response) => {
  let page = req.query.page || 1;
  let count = req.query.count || 5;

  const offset = (page - 1) * count;
  const offsetStr = offset ? `OFFSET ${offset}` : '' ;
  console.log(`${offsetStr}`);
  client.query(`SELECT * from product LIMIT ${count} ${offsetStr}`, (err, res) => {
    if (err) console.log(err);
    response.send(res.rows);
  })
});
// app.get('/products/:product_id', );
// app.get('/products/:product_id/styles');
// app.get('/products/:product_id/related');

// router.route('/cart')
//   .get() //200 ok
//   .post(); //201 created sku_id: qty

