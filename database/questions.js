const mongoose = require('mongoose');

const questions = new mongoose.Schema({
  _id: Number,
  ' product_id': Number,
  ' body': String,
  ' date': Date,
  ' asker_name': String,
  ' asker_email': String,
  ' reported': Boolean,
  ' helpfulness': Number,
}, {collection: "questions"});

const Question = mongoose.model('Question', questions);

module.exports = Question;