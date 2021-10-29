const express = require("express");
const router = require('../routes.js');

const morgan = require('morgan');
const parser = require('body-parser');

const app = express();

app.use(morgan('dev'));
app.use(parser.json());

app.use('/reviews', router);

module.exports = app;
