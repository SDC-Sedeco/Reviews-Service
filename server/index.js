const express = require("express");

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  // console.log('Got it!');
  res.send('Gotcha!');
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});