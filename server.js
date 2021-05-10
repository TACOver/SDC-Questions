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

  queries.helpQuestion(question_id, (err, data) => {
    if (err) {
      console.log('ERROR retrieving helpfulness info ', err)
    } else {
      console.log('PUT req successful to update a question as helpful');
      res.send(`Question: ${question_id} has been updated`);
    }
  })
});


// POSTS A NEW QUESTION /////////////////////////////////////
app.post('/qa/questions', (req, res) => {
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const product_id = req.body.product_id;
  console.log('This is product_id ', product_id);

 queries.addQuestion(body, name, email, product_id, (err, data) => {
   if (err) {
     console.log('ERROR adding a question from server ', err);
   } else {
     console.log('POST req successful to add a question');
     res.send(`Question has been added to product ${product_id}`);
   }
 });
});


// UPDATES AN ANSWER AS REPORTED ////////////////////////////
app.put('/qa/answers/:answer_id/report', (req, res) => {
  const answer_id = Number(req.params.answer_id);

  queries.reportAnswer(answer_id, (err, data) => {
    if (err) {
      console.log('ERROR reporting a answer from server ', err);
    } else {
      console.log('PUT req successful to report a answer');
      res.send(`Answer: ${answer_id} has been reported`);
    }
  })
});


// UPDATES AN ANSWER AS HELPFUL ////////////////////////////
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const answer_id = Number(req.params.answer_id);

  queries.helpAnswer(answer_id, (err, data) => {
    if (err) {
      console.log(`ERROR updating ${answer_id} as helpful `, err)
    } else {

      console.log('PUT req successful to update a answer as helpful');
      res.send(`Answer: ${answer_id} has been updated`);
    }
  })
});


// UPDATES A QUESTION WITH A NEW ANSWER /////////////////////////////////////
app.put('/qa/answers', queries.addAnswer);

// UPDATES A QUESTION WITH A NEW ANSWER /////////////////////////////////////
app.put('/qa/kim', (req, res) => {
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const question_id = req.body.question_id;

 queries.addAnswer(body, name, email, question_id, (err, data) => {
   if (err) {
     console.log('ERROR adding an answer from server ', err);
   } else {
     console.log('PUT req successful to add an answer', data);
     res.send(`Answer has been added to question ${question_id}`);
   }
 });
});