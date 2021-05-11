const mongoose = require('mongoose');
const Counter = require('./counters.js');
const Result = require('./resultsSchema.js');
const format = require('./formatters.js');

//////////////////////////////////////////////////////////////////
// DATABASE CONNECTION ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////

mongoose.connect('mongodb://localhost/qaSchema', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongoose is connected!');
  })
  .catch(() => {
    console.log('Mongoose error');
  });


//////////////////////////////////////////////////////////////////
// QUERY FUNCTIONS ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////

// QUESTIONS /////////////////////////////////////////////////////
const getQuestions = (req, res) => {
  const product_id = req.query.product_id;
  const count = req.query.count;

  Result.find({ "product_id": product_id, "reported": false })
    .sort({ "reported": false })
    .sort({ "helpfulness": -1 })
    .limit(Number(count))
    .then((response) => {
      console.log('GET req successful for questions');
      const formatted = format.questionsForClient(response);
      res.send(formatted);
    })
    .catch((err) => {
      console.log('ERROR retrieving questions from db ', err);
    });
};


const reportQuestion = (req, res) => {
  const question_id = Number(req.params.question_id);

  Result.updateOne({ "_id": question_id }, { "reported": true })
    .then((response) => {
      console.log('PUT req successful to report a question');
      res.send(`Question: ${question_id} has been reported`);
    })
    .catch((err) => {
      console.log('ERROR reporting a question ', err);
    });
};


const helpQuestion = (req, res) => {
  const question_id = Number(req.params.question_id);

  Result.updateOne({ "_id": question_id }, { $inc: { "helpfulness": 1 } })
    .then((response) => {
      console.log('PUT req successful to update a question as helpful');
      res.send(`Question: ${question_id} has been updated`);
    })
    .catch((err) => {
      console.log('ERROR retrieving helpfulness info ', err)
    });
};


const addQuestion = async (req, res) => {
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const product_id = req.body.product_id;

  const id = await Counter.findOneAndUpdate({ "name": "question_id" }, { $inc: { "value": 1 } }, { useFindAndModify: false })
  const question = format.questionForDb(body, name, email, product_id, id.value);
  const questionToSave = new Result(question);

  questionToSave.save((err, data) => {
    if (err) {
      console.log('ERROR adding a question from server ', err);
    } else {
      console.log('POST req successful to add a question');
      res.send(`Question has been added to product ${product_id}`);
    }
  });
};


// ANSWERS /////////////////////////////////////////////////////
const reportAnswer = (req, res) => {
  const answer_id = Number(req.params.answer_id);

  Result.updateOne({ "answers._id": answer_id }, { "answers.$.reported": true })
  .then((response) => {
    console.log('PUT req successful to report a answer');
    res.send(`Answer: ${answer_id} has been reported`);
  })
  .catch((err) => {
    console.log('ERROR reporting a answer from server ', err);
  });
};


const helpAnswer = (req, res) => {
  const answer_id = Number(req.params.answer_id);

  Result.updateOne({ "answers._id": answer_id }, { $inc: { "answers.$.helpful": 1 } })
    .then((response) => {
      console.log('PUT req successful to update a answer as helpful');
      res.send(`Answer: ${answer_id} has been updated as helpful`);
    })
    .catch((err) => {
      console.log(`ERROR updating ${answer_id} as helpful `, err);
    });
};


const addAnswer = async (req, res) => {
  body = req.body.body;
  name = req.body.name;
  email = req.body.email;
  question_id = req.body.question_id;

  const id = await Counter.findOneAndUpdate({ "name": "answer_id" }, { $inc: { "value": 1 } }, { useFindAndModify: false })
  const answer = format.answerForDb(body, name, email, question_id, id.value);

  Result.updateOne(
    { "_id": question_id },
    { $push: { "answers":  answer } })
    .then((response) => {
      console.log('PUT req successful to add an answer')
      res.send(`Answer has been added to question ${question_id}`)
    })
    .catch((err) => {
      console.log(`ERROR adding an answer to question ${question_id}`, err);
    });
};

module.exports = { getQuestions, reportQuestion, helpQuestion, addQuestion, reportAnswer, helpAnswer, addAnswer };