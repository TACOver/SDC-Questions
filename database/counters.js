const mongoose = require('mongoose');

const counters = new mongoose.Schema({
  name: String,
  value: Number,
}, { collection: "counters" });

const Counter = mongoose.model('Counter', counters);

module.exports = Counter;