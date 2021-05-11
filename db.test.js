const request = require('supertest');
const app = require('./server.js');

const getQuestions = '/qa/questions?product_id=45&count=5';
const putQHelpful = '/qa/questions/31083/helpful';
const putQReport = '/qa/questions/31083/report';
const postQuestion = '/qa/questions'
const putAHelpful = '/qa/answers/31083/helpful';
const putAReport = '/qa/answers/31083/report';
const putNewAnswer = '/qa/answers';

describe('Question service tests', () => {

  it('should perform a get request for all questions', async () => {
    await request(app)
      .get(getQuestions)
      .then(async (res) => {
        expect(res.body.product_id).toBe(45);
        expect(res.body.results.length).toBe(5);
      });
  });

  it('should report a question', async () => {
    await request(app)
      .put(putQReport)
      .expect(200);
  });

  it('should update a question as helpful', async () => {
    await request(app)
      .put(putQHelpful)
      .expect(200);
  });

  it('should add a new question', async () => {
    const body = {
      "body": "How do you make supertest work?",
      "name": "KimSoko",
      "email": "Kim@galavanize.com",
      "product_id": 45
    };

    await request(app)
      .post(postQuestion)
      .send(body)
      .expect(200);
  });

  it('should report an answer', async () => {
    await request(app)
      .put(putAReport)
      .expect(200);
  });

  it('should update an answer as helpful', async () => {
    await request(app)
      .put(putAHelpful)
      .expect(200);
  });

  it('should add a new answer', async () => {
    const body = {
      "body": "You do your research and figure it out!",
      "name": "KimSchaefer",
      "email": "Schaefer@galvanize.com",
      "question_id": 31083
    };

    await request(app)
      .put(putNewAnswer)
      .send(body)
      .then((response) => {
        expect(200);
      })
  });
});