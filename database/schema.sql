DROP DATABASE IF EXISTS sdcreviews;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS metaData;
DROP TABLE IF EXISTS metaDataRatings;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS recommend;

CREATE DATABASE sdcreviews;

\c sdcreviews

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

CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  review_id INTEGER,
  url TEXT
);

CREATE TABLE characteristic_reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER,
  review_id INTEGER,
  value INTEGER
);

CREATE TABLE characteristics (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER,
  name TEXT
);