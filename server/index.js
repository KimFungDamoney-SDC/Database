const express = require('express');
const db = require('../questionsdb/index.js');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const PORT = 3030;
const router = require('./router.js');
const loaderFile = require('../loaderio-b4de04d589edc3a2c372ebbd96ce03dc.txt');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', router);

app.get('/loaderio-b4de04d589edc3a2c372ebbd96ce03dc', (req, res) => {
  console.log()
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
