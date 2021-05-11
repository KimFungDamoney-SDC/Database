DROP DATABASE IF EXISTS sdcquestions;

CREATE DATABASE sdcquestions;

\c sdcquestions;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS answer_photos;

CREATE TABLE questions (
  id serial primary key,
  product_id int not null,
  body varchar(1000) not null,
  date timestamp not null,
  name varchar(60) not null,
  email varchar(60) not null,
  reported boolean default false,
  helpfulness int not null
);

CREATE TABLE answers (
  id serial primary key,
  question_id int not null,
  body varchar(1000) not null,
  date timestamp not null,
  name varchar(60) not null,
  email varchar(60) not null,
  reported boolean default false,
  helpfulness int not null
);

CREATE TABLE answer_photos (
  id serial primary key,
  answer_id int not null,
  url varchar(1000) not null
);

CREATE INDEX idx_product_id ON questions(product_id);
CREATE INDEX idx_question_id ON answers(question_id);
CREATE INDEX idx_answer_id ON answer_photos(answer_id);