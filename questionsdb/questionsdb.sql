DROP DATABASE IF EXISTS sdcquestions;

CREATE DATABASE sdcquestions;

\c sdcquestions;

DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS answer_photos;

CREATE TABLE questions (
  id serial primary key,
  product_id int not null,
  question_body varchar(1000) not null,
  date_written date not null default current_date,
  asker_name varchar(60) not null,
  asker_email varchar(60) not null,
  reported boolean default false,
  helpful serial
);

CREATE TABLE answers (
  id serial primary key,
  question_id int not null,
  answer_body varchar(1000) not null,
  date_written date not null default current_date,
  answerer_name varchar(60) not null,
  answerer_email varchar(60) not null,
  reported boolean default false,
  helpful serial
);

CREATE TABLE answer_photos (
  id serial primary key,
  answer_id int not null,
  photo_url varchar(150) not null
);