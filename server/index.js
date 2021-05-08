const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const { Pool, Client, Query } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const csv = require('csv-parser');

const paths = [path.join(__dirname, '../db_products/features.csv')];
const tables = ['feature']

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
  tables.forEach((table, ind) => {
    execute(table, (err) => {
      if(err) return console.log(err);
      const stream = client.query(copyFrom(`COPY ${table} FROM STDIN WITH (FORMAT CSV)`));
      const fileStream = fs.createReadStream(paths[ind]);
      fileStream.pipe(stream)
      fileStream.on('end', () => {
        console.log(`Completed loading data into ${table}`)
      })
      stream.on('error', (error) => {
        console.log(`Error during copying: ${error}`)
      })
      fileStream.on('error', (error) => {
        console.log(`Error loading to table`)
      })
    })
  })
}

executeQuery(tables);