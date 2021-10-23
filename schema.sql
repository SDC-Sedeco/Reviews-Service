CREATE DATABASE reviewsData;

USE reviewsData;

CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  summary TEXT NOT NULL,
  recommend BOOLEAN NOT NULL DEFAULT FALSE,
  response TEXT DEFAULT NULL,
  body TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewer_name TEXT NOT NULL,
  email TEXT NOT NULL,
  helpfulness INT NOT NULL DEFAULT 0,
  reported BOOLEAN NOT NULL DEFAULT FALSE
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