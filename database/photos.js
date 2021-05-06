const mongoose = require('mongoose');

const photos = new mongoose.Schema({
  _id: Number,
  answer_id: Number,
  url: String,
});

const Photo = mongoose.model('Photo', photos);

module.exports = Photo;