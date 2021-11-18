const express = require("express");
const router = require('../routes.js');

const morgan = require('morgan');
const parser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(parser.json());

app.use('/reviews', router);

app.get('/loaderio*', (req, res) => {
  res.status(200).send('loaderio-b7ad4fe06c9b56b2b510879600c55906');
});

module.exports = app;
