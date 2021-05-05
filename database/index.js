const mongoose = require('mongoose');
const questions = require('./questions.csv');

mongoose.connect('mongodb://localhost/qaSchema', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongoose is connected!');
  })
  .catch(() => {
    console.log('Mongoose error');
  });



// QA.insertMany(arrayOfObjects, callback);
