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

app.get('/loaderio-4359158a7f33d70a989baa93a442e894.txt', (req, res) => {
  res.send('loaderio-861f6c07148a8d3232762406c849ffcf');
})