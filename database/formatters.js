const mongoose = require('mongoose');

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

  return productInfo;
};

const questionForDb = (body, name, email, product_id, id) => {
  return {
    "_id": Number(id),
    "product_id": product_id,
    "body": body,
    "date": Date.now(),
    "asker_name": name,
    "asker_email": email,
    "reported": false,
    "helpfulness": 0,
    "answers": []
  }
};

const answerForDb = (body, name, email, question_id, id) => {
  const result = {
    "_id": Number(id),
    "question_id": Number(question_id),
    "body": body,
    "date": Date.now(),
    "answerer_name": name,
    "answerer_email": email,
    "reported": false,
    "helpful": 0,
    "answer_photos": []
  };
  return result;
};

module.exports = { questionsForClient, questionForDb, answerForDb };