const express = require("express");
const router = require('../routes.js');

const morgan = require('morgan');
const parser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(parser.json());

app.use('/test', router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});