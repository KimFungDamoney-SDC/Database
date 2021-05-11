const { Pool, Client } = require('pg');
const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const path = require('path');

const questionsData = path.join(__dirname, './questions.csv');
const photosData = path.join(__dirname, './answers_photos.csv');
const answersData = path.join(__dirname, './answers.csv');

const questions = 'questions';
const photos = 'answer_photos';
const answers = 'answers';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'sdcquestions',
  password: 'please',
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.log(err)
    throw err;
  } else {
    console.log('successfully connected to the database');
  }
});

const dataArray = [questionsData, answersData, photosData];
const tableArray = [questions, answers, photos];

const executeQuery = (tables) => {
  const execute = (target, callback) => {
    client.query(`Truncate ${target}`, (err) => {
      if (err) {
        client.end()
        callback(err)
      } else {
        console.log(`Truncated ${target}`)
        callback(null, target)
      }
    })
  }
  tables.forEach((table, index) => {
    execute(table, (err) => {
      if (err) return console.log(err);
      var stream = client.query(copyFrom(`Copy ${table} FROM STDIN WITH CSV HEADER`));
      var fileStream = fs.createReadStream(dataArray[index]);
      fileStream.pipe(stream)
      fileStream.on('end', () => {
        console.log(`Completed loading data into ${table}`)
      })
      fileStream.on('error', (error) => {
        console.log(error)
      })
      stream.on('error', (error) => {
        console.log(error)
      })
    })
  })
}

executeQuery(tableArray);

module.exports = client;