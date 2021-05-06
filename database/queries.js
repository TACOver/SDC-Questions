const mongoose = require('mongoose');
const Answer = require('./answers.js');
const Question = require('./questions.js');
const Photo = require('./photos.js');

mongoose.connect('mongodb://localhost/qaSchema', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongoose is connected!');
  })
  .catch(() => {
    console.log('Mongoose error');
  });

const getAllQuestions = (product_id, count, callback) => {

  Question.find({" product_id": product_id})
    .limit(Number(count))
    .exec(callback);

  console.log('completed getAllQuestions query');
};

module.exports = { getAllQuestions };
