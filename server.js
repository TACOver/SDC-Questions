const express = require('express');
const queries = require('./database/queries.js');
const app = express();
const format = require('./database/formatters.js');

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


// SENDS BACK ALL QA DATA FOR A GIVEN PRODUCT_ID AND COUNT ////////
app.get('/qa/questions', (req, res) => {
  const product_id = req.query.product_id;
  const count = req.query.count;

  queries.getQuestions(product_id, count, (err, data) => {
    if (err) {
      console.log('ERROR retrieving questions from db ', err);
    } else {
      console.log('GET req successful for questions');
      const formatted = format.questionsForClient(data);
      res.send(formatted);
    }
  })

});


// UPDATES A QUESTION AS REPORTED ////////////////////////////
app.put('/qa/questions/:question_id/report', (req, res) => {
  const question_id = Number(req.params.question_id);

  queries.reportQuestion(question_id, (err, data) => {
    if (err) {
      console.log('ERROR reporting a question ', err);
    } else {
      console.log('PUT req successful to report a question');
      res.send(`Question: ${question_id} has been reported`);
    }
  })
});


// UPDATES A QUESTION AS HELPFUL ////////////////////////////
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  const question_id = Number(req.params.question_id);

  queries.getQHelpfulness(question_id, (err, data) => {
    if (err) {
      console.log('ERROR retrieving helpfulness info ', err)
    } else {
      const helpfulness = data.helpfulness;
      queries.helpQuestion(question_id, helpfulness, (err, data) => {
        if (err) {
          console.log('ERROR updating a question as helpful', err);
        } else {
          console.log('PUT req successful to update a question as helpful');
          res.send(`Question: ${question_id} has been updated`);
        }
      })
    }
  })
});