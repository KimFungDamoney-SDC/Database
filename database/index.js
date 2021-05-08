const { Client, Pool } = require('pg');
const fs = require('fs');
const copyFrom = require('pg-copy-streams').from;
const path = require('path');
const config = require('../config.json');

const reviewInput = path.join(__dirname, '../csvFiles/reviews.csv');
const photosInput = path.join(__dirname, '../csvFiles/reviews_photos.csv');
const characteristic_reviewsInput = path.join(__dirname, '../csvFiles/characteristic_reviews.csv');
const characteristicsInput = path.join(__dirname, '../csvFiles/characteristics.csv');

const reviews = 'reviews';
const photos = 'photos';
const characteristics = 'characteristics';
const characteristic_reviews = 'characteristic_reviews';

const dataArray = [reviewInput, photosInput, characteristicsInput, characteristic_reviewsInput];
const tableArray = ['reviews', 'photos', 'characteristics', 'characteristic_reviews'];

const host = config.host;
const user = config.user;
const db = config.db;
const pw = config.pw;
const port = config.port;
const conString = `sdcreviews://${user}:${pw}@${host}:${port}/${db}`;

const client = new Client({
  connectionString: conString,
});

client.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Successfuly connected to the database!!!!');
  }
});

const executeQuery = (tables) => {
  const execute = (target, callback) => {
    client.query(`Truncate ${target}`, (err) => {
      if (err) {
        client.end()
        callback(err)
      } else {
        console.log(`Truncate ${target}`)
        callback(null, target)
      }
    })
  }
  tables.forEach((table, index) => {

    execute(table, (err) => {
      if (err) return console.log(`Error in Truncate Table: ${err}`)
      var stream = client.query(copyFrom(`COPY ${table} FROM STDIN CSV HEADER`))
      var fileStream = fs.createReadStream(dataArray[index])

      fileStream.on('error', (error) => {
        console.log(err)
      })
      stream.on('error', (error) => {
        console.log(`Error in creating stream ${error}`)
      })
      fileStream.on('end', () => {
        console.log(`Completed loading data into ${table}`)
      })
      fileStream.pipe(stream)
    })
  })
}
  executeQuery(tableArray);

module.exports = client;