const mongoose = require('mongoose');
const Answer = require('./answers.js');
const Question = require('./questions.js');
const Photo = require('./photos.js');
const Result = require('./questionResults.js');

mongoose.connect('mongodb://localhost/qaSchema', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongoose is connected!');
  })
  .catch(() => {
    console.log('Mongoose error');
  });

const getQuestions = (product_id, count, callback) => {
  Result.find({ "product_id": product_id })
    .sort({ "reported": false })
    .sort({ "helpfulness": -1 })
    .limit(Number(count))
    .exec(callback);

  console.log('completed getAllQuestions query');
};

const reportQuestion = (question_id, callback) => {
  Result.updateOne( { "_id": question_id }, { "reported": true })
    .exec(callback);
};

const getQHelpfulness = (question_id, callback) => {
  Result.find({ "_id": question_id })
    .exec(callback);
}

const helpQuestion = (question_id, helpfulness, callback) => {
  Result.updateOne( { "_id": question_id }, { "helpfulness":  helpfulness})
    .exec(callback);
};

const addQuestion = (data, callback) => {
  let formatted = formatQuestion(data)
  const questionToSave = new Question(formatted);

  questionToSave.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Question successfully added to db');
    }
  });
};

const addAnswer = (data, callback) => {
  let formatted = formatAnswer(data)
  const answerToSave = new Answer(formatted);

  answerToSave.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Answer successfully added to db');
    }
  });
};

module.exports = { getQuestions, reportQuestion, getQHelpfulness, helpQuestion, addQuestion, addAnswer };
