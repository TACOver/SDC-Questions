
// add the photos data to an array in answers
db.answers.aggregate([
  { $match : { } },
  { $lookup : {
    from : "photos",
    localField : "_id",
    foreignField : "answer_id",
    as : "answer_photos",
  } },
  { $out : "answerResults" }
], { allowDiskUse : true })

// add the answers data to an array in questions
db.questions.aggregate([
  { $match : { } },
  { $lookup : {
    from : "answers",
    localField : "_id",
    foreignField : "question_id",
    as : "answers",
  } },
  { $out : "questionResults" }
],  { allowDiskUse : true })