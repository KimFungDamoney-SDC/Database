const newrelic = require('../newrelic.js');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const database = require('../database/index.js')
const router = require('./router.js');

const app = express();
const PORT = 3030;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

module.exports = app