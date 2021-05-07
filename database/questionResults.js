const mongoose = require('mongoose');

const questionResults = new mongoose.Schema({
  _id: Number,
  "poduct_id": Number,
  "body": String,
  "date": Date,
  "asker_name": String,
  "asker_email": String,
  "reported": Boolean,
  "helpfulness": Number,
  "answers": [
    {
      "_id": Number,
    "answer_photos": [
      {
      "_id": Number,
      "answer_id": Number,
      "url": String,
    },
    ],
    "answerer_email": String,
    "answerer_name": String,
    "body": String,
    "date": Date,
    "helpful": Number,
    "question_id": Number,
    "reported": Boolean,

  },
  ],
}, {collection: "questionResults"});

const Result = mongoose.model('Result', questionResults);

module.exports = Result;