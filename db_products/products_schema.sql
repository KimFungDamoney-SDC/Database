DROP DATABASE IF EXISTS SDC_products;

CREATE DATABASE SDC_products;

CREATE TABLE product_info (
  product_id INT AUTO_INCREMENT NOT NULL primary key,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  slogan TINYTEXT,
  description TEXT
)

CREATE TABLE styles (
  style_id INT AUTO_INCREMENT NOT NULL primary key,
  name TINYTEXT NOT NULL,
  original_price DECIMAL(10, 2),
  sale_price DECIMAL(10, 2),
  FOREIGN KEY (photo_id) REFERENCES photos(photo_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
)

CREATE TABLE SKU (
  sku_id INT AUTO_INCREMENT NOT NULL primary key,
  quantity INT NOT NULL,
  size TEXT,
  FOREIGN KEY (style_id) REFERENCES styles(style_id)
)

CREATE TABLE transactions (
  trans_id INT AUTO_INCREMENT NOT NULL primary key,
  user_id varchar,
  FOREIGN KEY (tsku_id) REFERENCES transactions_sku(tsku_id)
)

CREATE TABLE transactions_sku (
  tsku_id INT AUTO_INCREMENT NOT NULL primary key,
  FOREIGN KEY (sku_id) REFERENCES SKU(sku_id),
  quantity INT NOT NULL
)

CREATE TABLE photos (
  photo_id INT AUTO_INCREMENT NOT NULL primary key,
  thumbnail varchar,
  photo varchar,
  FOREIGN KEY (style_id) REFERENCES styles(style_id)
)

