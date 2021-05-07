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

const getAllQuestions = (product_id, count, callback) => {
  Result.find({ "product_id": product_id })
    .sort({ "repoted": false })
    .sort({ "helpfulness": -1 })
    .limit(Number(count))
    .exec(callback);

  console.log('completed getAllQuestions query');
};

const getAllAnswers = (question_id, count, callback) => {
  Answer.find({ "question_id": question_id })
    .sort({ "reported": false })
    .sort({ "helpfulness": -1 })
    .limit(Number(count))
    .exec(callback);
};

const formatQuestion = (question) => {
  return {
    _id,
    product_id: question.product_id,
    body: question.body,
    date: Date.now(),
    answerer_name: question.name,
    asker_email: question.email,
    reported: question.reported,
    helpfulness: question.helpfulness
  }
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

const formatAnswer = (answer) => {
  return {
    _id,
    question_: answer.product_id,
    body: answer.body,
    date: Date.now(),
    answerer_name: answer.name,
    answerer_email: answer.email,
    reported: answer.reported,
    helpfulness: answer.helpfulness
  }
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

module.exports = { getAllQuestions, getAllAnswers, addQuestion, formatQuestion, addAnswer, formatAnswer };
