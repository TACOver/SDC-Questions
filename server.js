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


// SENDS BACK ALL QA DATA FOR A GIVEN PRODUCT_ID AND COUNT //////////////////
app.get('/qa/questions', queries.getQuestions);

// UPDATES A QUESTION AS REPORTED ///////////////////////////////////////////
app.put('/qa/questions/:question_id/report', queries.reportQuestion);

// UPDATES A QUESTION AS HELPFUL ////////////////////////////////////////////
app.put('/qa/questions/:question_id/helpful', queries.helpQuestion);

// POSTS A NEW QUESTION /////////////////////////////////////////////////////
app.post('/qa/questions', queries.addQuestion);

// UPDATES AN ANSWER AS REPORTED ///////////////////////////////////////////
app.put('/qa/answers/:answer_id/report', queries.reportAnswer);

// UPDATES AN ANSWER AS HELPFUL ////////////////////////////////////////////
app.put('/qa/answers/:answer_id/helpful', queries.helpAnswer);

// UPDATES A QUESTION WITH A NEW ANSWER ////////////////////////////////////
app.put('/qa/answers', queries.addAnswer);
