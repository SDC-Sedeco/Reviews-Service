CREATE DATABASE reviewsData;

USE reviewsData;

CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  recommend BOOLEAN NOT NULL DEFAULT FALSE,
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  reviewer_name TEXT NOT NULL,
  reviewer_email TEXT NOT NULL,
  response TEXT DEFAULT NULL,
  helpfulness INT NOT NULL DEFAULT 0
);

CREATE TABLE characteristics (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  name TEXT
);

CREATE TABLE characteristics_reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  review_id INT NOT NULL,
  characteristic_id INT NOT NULL,
  value INT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews (id),
  FOREIGN KEY (characteristic_id) REFERENCES characteristics (id)
);

CREATE TABLE photos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  url TEXT,
  review_id INT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews (id)
);