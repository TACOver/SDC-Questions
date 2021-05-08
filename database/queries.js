const mongoose = require('mongoose');
const Counter = require('./counters.js');
const Answer = require('./answers.js');
const Question = require('./questions.js');
const Photo = require('./photos.js');
const Result = require('./questionResults.js');
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
const getQuestions = (product_id, count, callback) => {
  Result.find({ "product_id": product_id, "reported": false })
    .sort({ "reported": false })
    .sort({ "helpfulness": -1 })
    .limit(Number(count))
    .exec(callback);

  console.log('completed getAllQuestions query');
};


const reportQuestion = (question_id, callback) => {
  Result.updateOne({ "_id": question_id }, { "reported": true })
    .exec(callback);
};


const helpQuestion = (question_id, callback) => {
  Result.updateOne({ "_id": question_id }, { $inc: { "helpfulness": 1 } })
    .exec(callback);
};


const addQuestion = async (body, name, email, product_id, callback) => {
  const id = await Counter.findOneAndUpdate({ "name": "question_id" }, { $inc: { "value": 1 } }, { useFindAndModify: false })
  const formatted = format.questionForDb(body, name, email, product_id, id.value);
  const questionToSave = new Result(formatted);

  questionToSave.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      callback(null, data);
      console.log('Question successfully added to db ', data);
    }
  });
};


// ANSWERS /////////////////////////////////////////////////////
const reportAnswer = (answer_id, callback) => {
  Result.updateOne({ "answers._id": answer_id }, { "answers.$.reported": true })
    .exec(callback);
};


const helpAnswer = (answer_id, callback) => {
  Result.updateOne({ "answers._id": answer_id }, { $inc: { "answers.$.helpful": 1 } })
    .exec(callback);
};


const addAnswer = async (body, name, email, question_id, callback) => {
  const id = await Counter.findOneAndUpdate({ "name": "answer_id" }, { $inc: { "value": 1 } }, { useFindAndModify: false })
  const formatted = format.answerForDb(body, name, email, question_id, id.value);

  Result.findByIdAndUpdate(question_id, { $push: { "answers": { formatted } } })
    .exec(callback);
};

module.exports = { getQuestions, reportQuestion, helpQuestion, addQuestion, reportAnswer, helpAnswer, addAnswer };

// ANSWER WRITTEN OUT
// { "answers.$._id": Number(id.value), "answers.$.answer_photos": [], "answers.$.answerer_email": email, "answers.$.answerer_name": name, "answers.$.body": body, "answers.$.date": Date.now(), "answers.$.helpful": 0, "answers.$.question_id": question_id, "answers.$.reported": false }