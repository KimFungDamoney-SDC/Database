const express = require('express');
const db = require('../questionsdb/index.js');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const PORT = 3030;
const router = require('./router.js');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api', router);

app.get('/loaderio-49e67f5cc4f16b8e9bd1eaf2cb441517', (req, res) => {
  res.send('loaderio-49e67f5cc4f16b8e9bd1eaf2cb441517')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
