const express = require('express');
const queries = require('./database/queries.js');
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

app.get('/qa/questions', (req, res) => {
  const product_id = req.query.product_id;
  const count = req.query.count;
  console.log('Product_id is ', product_id, ' and count is ', count);

  // This route should send back all the questions for a given product_id
  queries.getAllQuestions(product_id, count, (err, data) => {
    if (err) {
      console.log('ERROR retrieving all questions from db ', err);
    } else {
      console.log('GET req successful for questions', data);
      res.send(data);
    }
  })
});