const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/qaSchema', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Mongoose is connected!');
  })
  .catch(() => {
    console.log('Mongoose error');
  });

const qaSchema = new mongoose.Schema({
  // _id: Number,
  // name: String,
  // forks: Number,
  // username: String,
  // url: String,
  // date: Date,
});

const QA = mongoose.model('qa', qaSchema);

// const save = (repos, callback) => {
//   repos.forEach((repo) => {
//     let formatted = formatRepo(repo)
//     const repoToSave = new Repo(formatted)

//     repoToSave.save((err) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Data saved [line45]');
//       }
//     });
//   })
// };