const mongoose = require('mongoose');

const answers = new mongoose.Schema({
  _id: Number,
  question_id: Number,
  body: String,
  date: Date,
  answerer_name: String,
  answerer_email: String,
  reported: Boolean,
  helpfulness: Number,
}, {collection: "answers"});

const Answer = mongoose.model('Answer', answers);

module.exports = Answer;