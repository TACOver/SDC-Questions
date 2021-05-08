const mongoose = require('mongoose');

const questionResults = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    auto: true,
  },
  "product_id": Number,
  "body": String,
  "date": Date,
  "asker_name": String,
  "asker_email": String,
  "reported": Boolean,
  "helpfulness": Number,
  "answers": [
    {
    "answerer_email": String,
    "answerer_name": String,
    "body": String,
    "date": Date,
    "helpful": Number,
    "question_id": Number,
    "reported": Boolean,
    "answer_photos": [
      {
        "_id": Number,
        "answer_id": Number,
        "url": String,
      }],
    }],
}, {collection: "questionResults"});

const Result = mongoose.model('Result', questionResults);

module.exports = Result;