const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})

app.get('/loaderio-8cc35a713042004f4c55e85cb31f2295.txt', (req, res) => {
  res.send('loaderio-8cc35a713042004f4c55e85cb31f2295');
})