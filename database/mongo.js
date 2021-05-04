{
  "product_id": INT,
    "questions": [
      "question_id_as_an_int_name_of_a_property_representing_that_questionObj": {
      "question_id": INT,,
      "question_body": STRING, 250 CHAR,
      "question_date": STRING OR DATE IF ALLOWED,
      "asker_name": STRING, 50 CHAR,
      "question_helpfulness": INT,
      "reported": BOOLEAN,
      "answers": [
           "answer_id_has_an_int_name_of_a_property": {
            "answer_id": INT,,
            "answer_body": STRING, 250 CHAR,
            "answer_date": DATE,
            "answerer_name": STRING, 50 CHAR,
            "answer_helpfulness": INT,
            "photos": [
               {
                "photos_id": INT,
                "photos_url": STRING, 500 CHAR
              }
            ]
          }
        ]
    ]
};

// EXAMPLE

{
  "product_id": 8708,
    "questions": [
      4523: {
      "question_id": 4523,
      "question_body": "How did this jacket do in the wash?",
      "question_date": "2018-10-18T00:00:00.000Z",
      "asker_name": "JoeSchmoe45",
      "question_helpfulness": 34,
      "reported": false,
      "answers": [
           23: {
            "answer_id": 23,
            "answer_body": "Great, didn't shrink or discolor at all. I washed it on low heat, air dry",
            "answer_date": "2018-10-18T00:00:00.000Z",
            "answerer_name": "StaceySmith32",
            "answer_helpfulness": 123,
            "photos": [
               {
                "photos_id": 427,
                "photos_url": "http://wwww.hostedImagas.net/MyJacketWashed.jpg"
              }
            ]
          }
        ]
    ]
};
