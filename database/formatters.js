const questionsForClient = (data) => {
  const productInfo = {}
  productInfo.product_id = data[0].product_id;
  productInfo.results = data.map((question) => {
    return {
      question_id: question._id,
      question_body: question.body,
      question_date: question.date,
      asker_name: question.asker_name,
      question_helpfulness: question.helpfulness,
      reported: question.reported,
      answers: question.answers
    }
  });

  console.log('This is the final result ', productInfo)
  return productInfo;
};

const questionForDb = (question) => {
  return {
    _id,
    product_id: question.product_id,
    body: question.body,
    date: Date.now(),
    answerer_name: question.name,
    asker_email: question.email,
    reported: question.reported,
    helpfulness: question.helpfulness
  }
};

const answerForDb = (answer) => {
  return {
    _id,
    question_: answer.product_id,
    body: answer.body,
    date: Date.now(),
    answerer_name: answer.name,
    answerer_email: answer.email,
    reported: answer.reported,
    helpfulness: answer.helpfulness
  }
};



module.exports = { questionsForClient, questionForDb, answerForDb };