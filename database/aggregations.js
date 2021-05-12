// ADD AN INDEX on answer_id in photos TO MAKE SEARCH MORE EFFICIENT
db.photos.createIndex({ "answer_id": 1 })

db.answers.createIndex({"_id": 1})

db.questions.createIndex({ "_id": 1 })

// ADD PHOTOS ARR TO ANSWERS USING INDEX
db.answers.aggregate(
  { $lookup : {
    from : "photos",
    localField : "_id",
    foreignField : "answer_id",
    as : "answer_photos",
  } },
  { $out : { db: "qaSchema", coll: "answer-results" } }
  )

// ADD AN INDEX on question_id in answers TO MAKE SEARCH MORE EFFICIENT
db.answerResults.createIndex(
  {
    "question_id": 1
  }
)

// add the answers data to an array in questions
db.questions.aggregate(
  { $lookup : {
    from : "answerResults",
    localField : "_id",
    foreignField : "question_id",
    as : "answers",
  } },
  { $out : { db: "qaSchema", coll: "questionResults" } }
)