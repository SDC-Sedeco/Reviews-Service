CREATE DATABASE reviewsData;

USE reviewsData;

CREATE TABLE reviews (
  id INT PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  summary TEXT,
  recommend BOOLEAN NOT NULL DEFAULT FALSE,
  response TEXT DEFAULT NULL,
  body TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewer_name TEXT,
  helpfulness INT NOT NULL DEFAULT 0
);

CREATE TABLE characteristics (
  id INT PRIMARY KEY,
  product_id INT NOT NULL,
  name TEXT
);

CREATE TABLE characteristic_reviews (
  id INT PRIMARY KEY,
  review_id INT NOT NULL,
  characteristic_id INT NOT NULL,
  value INT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews (id),
  FOREIGN KEY (characteristic_id) REFERENCES characteristics (id)
);

CREATE TABLE photos (
  id INT PRIMARY KEY,
  url TEXT,
  review_id INT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews (id)
);