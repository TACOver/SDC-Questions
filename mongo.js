{
  "product_id": INT FOREIGN KEY,
    "results": [{
      "question_id": INT PRIMARY KEY,
      "question_body": STRING, 250 CHAR,
      "question_date": STRING OR DATE IF ALLOWED,
      "asker_name": STRING, 50 CHAR,
      "question_helpfulness": INT,
      "reported": BOOLEAN,
      "answers": {
           {
            "answer_id": INT FOREIGN KEY,
            "answer_body": STRING, 250 CHAR,
            "answer_date": STRING OR DATE IF ALLOWED,
            "answerer_name": STRING, 50 CHAR,
            "answer_helpfulness": INT,
            "photos": [
               {
                "photos_id": INT,
                "photos_url": STRING, 500 CHAR
              }
            ]
          }
      }
};