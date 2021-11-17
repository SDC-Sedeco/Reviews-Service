const express = require("express");
const router = require('../routes.js');

const morgan = require('morgan');
const parser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(parser.json());

app.use('/reviews', router);

app.get('/loaderio*', (req, res) => {
  res.status(200).send('loaderio-53bd3fe83f6e107449f0c80c9da4d8d1');
});

module.exports = app;
