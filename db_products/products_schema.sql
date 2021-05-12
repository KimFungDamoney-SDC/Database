DROP DATABASE IF EXISTS sdc_products;
DROP TABLE IF EXISTS feature, product, styles, sku, transactions, transactions_sku, photos, related;

CREATE DATABASE sdc_products;

\c sdc_products;

CREATE TABLE product (
  id SERIAL NOT NULL primary key,
  name VARCHAR NOT NULL,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR NOT NULL,
  default_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE styles (
  id SERIAL NOT NULL primary key,
  product_id INT REFERENCES product,
  name character(30) NOT NULL,
  sale_price VARCHAR,
  original_price DECIMAL(20, 2),
  default_style BOOLEAN
);

CREATE TABLE sku (
  id SERIAL NOT NULL primary key,
  style_id INT REFERENCES styles,
  size VARCHAR(10),
  quantity INT NOT NULL
);

CREATE TABLE transactions_sku (
  id SERIAL NOT NULL primary key,
  sku_id INT REFERENCES sku,
  quantity INT NOT NULL
);

CREATE TABLE transactions (
  id SERIAL NOT NULL primary key,
  user_id varchar,
  date TIMESTAMP,
  tsku_id int REFERENCES transactions_sku
);

CREATE TABLE photos (
  id int,
  style_id int REFERENCES styles,
  url varchar,
  thumbnail_url varchar
);

CREATE TABLE feature (
  id SERIAL primary key,
  product_id INT REFERENCES product,
  feature TEXT NOT NULL,
  value TEXT
);

CREATE TABLE related (
  id SERIAL NOT NULL primary key,
  current int REFERENCES product,
  related int
);

-- COPY product FROM '/Users/sueannkim/0SeniorPhase/Database/db_products/product.csv'
-- DELIMITER ',' CSV HEADER;

-- COPY styles FROM '/Users/sueannkim/0SeniorPhase/Database/db_products/styles.csv' DELIMITER ',' CSV HEADER;

-- COPY sku FROM '/Users/sueannkim/0SeniorPhase/Database/db_products/skus.csv' DELIMITER ',' CSV HEADER;

-- COPY photos FROM '/Users/sueannkim/0SeniorPhase/Database/db_products/photos.csv' DELIMITER ',' CSV HEADER;

-- COPY feature FROM '/Users/sueannkim/0SeniorPhase/Database/db_products/features.csv' WITH (FORMAT CSV);

-- COPY related FROM '/Users/sueannkim/0SeniorPhase/Database/db_products/related.csv' DELIMITER ',' CSV HEADER;