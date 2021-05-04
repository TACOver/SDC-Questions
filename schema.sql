CREATE DATABASE qa;

USE qa;

CREATE TABLE questions (
  question_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id int NOT NULL,
  reported boolean NOT NULL,
  question_helpfulness int NOT NULL,
  question_body varchar(250) NOT NULL,
  question_date date,
  asker_name varchar(20),
  asker_email varchar(50),
);

INSERT INTO question (question_id, product_id, reported, question_helpfulness, question_body, question_date, asker_name, asker_email)
VALUES (32415, 80708, false, 5, "Why is this product cheaper here than other sites?", "2018-10-18T00:00:00.000Z", "williamsmith", "william.smith@gmail.com");

CREATE TABLE answers (
  answer_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  question_id int NOT NULL FOREIGN KEY,
  reported boolean NOT NULL,
  answer_helpfulness int NOT NULL,
  answer_body varchar(250) NOT NULL,
  answer_date date,
  answerer_name varchar(20),
  answerer_email varchar(50),
  photo array of objects, in each obj there would be a photo_id int and photo_url string
);

INSERT INTO answers (answer_id, product_id, reported, answer_helpfulness, answer_body, answer_date, answerer_name, answerer_email)
VALUES (123, 32415, false, 25, "Project Catwalk has a more efficient supply chain", "2018-10-18T00:00:00.000Z", "janeSchaefer", "jane.schaefer@gmail.com");
