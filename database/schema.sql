DROP DATABASE IF EXISTS sdcreviews;


CREATE DATABASE sdcreviews;

\c sdcreviews

DROP TABLE IF EXISTS reviews;

CREATE SEQUENCE reviews_sequence;

CREATE TABLE reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER DEFAULT NULL,
  rating INTEGER DEFAULT NULL,
  created_at TIMESTAMP DEFAULT NULL,
  summary TEXT DEFAULT NULL,
  body TEXT DEFAULT NULL,
  recommend BOOLEAN DEFAULT NULL,
  reported BOOLEAN DEFAULT NULL,
  reviewer_name TEXT DEFAULT NULL,
  reviewer_email TEXT DEFAULT NULL,
  response TEXT DEFAULT NULL,
  helpfulness INTEGER DEFAULT NULL
);

DROP TABLE IF EXISTS photos;

CREATE SEQUENCE photos_sequence;

CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  review_id INTEGER,
  url TEXT
);

DROP TABLE IF EXISTS metadata;

CREATE SEQUENCE metadata_sequence;

CREATE TABLE metadata (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER,
  review_id INTEGER,
  value INTEGER
);

DROP TABLE IF EXISTS characteristics;

CREATE SEQUENCE characteristics_sequence;

CREATE TABLE characteristics (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER,
  name TEXT
);