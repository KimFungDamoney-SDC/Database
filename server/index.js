const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { Pool, Client, Query } = require('pg');
const copyFrom = require('pg-copy-streams').from;
// const productRoutes = require('./productRoutes.js');
const router = require('express').Router();
const csv = require('csv-parser');

const tables = [
  {
    table : 'product',
    path : path.join(__dirname, '../db_products/product.csv'),
    cmd: `COPY product FROM STDIN WITH (FORMAT CSV, HEADER)`
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
  }
];

const app = express();
const PORT = 3030;

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

const createIndex = [
  {name: 'styles', col: 'product_id'},
  {name: 'sku', col: 'style_id'},
  {name: 'photos', col: 'style_id'},
  {name: 'feature', col: 'product_id'},
  {name: 'related', col: 'current'}
];

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
  tables.forEach((entry, index) => {
    execute(entry.table, (err) => {
      if(err) console.log(err);

      const fileStream = fs.createReadStream(`${entry.path}`);
      const copyStream = client.query(copyFrom(`${entry.cmd}`));

      console.time(`${entry.table}`); // console time
      console.time(`copy ${entry.table}`)

      fileStream.pipe(copyStream);

      fileStream.on('error', (error) => {
        console.log(`Error reading file: ${entry.table}`);
      })
      copyStream.on('error', (error) => {
        console.log(`Error during copying: ${error}`);
      })
      fileStream.on('end', () => {
        console.log(`Completed reading stream ${entry.table}`);
        console.timeEnd(`${entry.table}`); //console time
        console.timeEnd(`copy ${entry.table}`);

        let tableNameInd = createIndex[index + 1].name;
        let colNameInd = createIndex[index + 1].col;

        if (`${entry.table}` === tableNameInd) {
          client.query(`CREATE INDEX idx_${entry.table}_${colNameInd} ON ${entry.table}(${colNameInd})`, (err, result) => {
            if(err) console.log(err);
            console.log(`created product index at ${entry.table}:`, result);
          })
        }

      })
    })
  })
}

// executeQuery(tables);

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

app.get('/loaderio-a3f5e03fd5bfbdc801e89ce77236e5b7/', (req, res) => {
  res.send('verified');
})

// router.route('/cart')
//   .get() //200 ok
//   .post(); //201 created sku_id: qty

