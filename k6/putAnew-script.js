import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '15s', target: 10 },
    { duration: '30s', target: 100 },
    { duration: '60s', target: 1000 },
    { duration: '15s', target: 0 },
  ],
};

export default function () {
  let body = {
    "body": "You do your research and figure it out!",
    "name": "KimSchaefer",
    "email": "Schaefer@galvanize.com",
    "question_id": 31083
  }

  let res = http.put('http://localhost:3000/qa/answers', body);
  check(res, { 'status was 200': r => r.status === 200 });
  sleep(1);
}