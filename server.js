const express = require('express');
const db = require('./database/index.js');
const app = express();

let port = process.env.PORT;
  if (port == null || port == "") {
    port = 3000;
  }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});