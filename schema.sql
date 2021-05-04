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

