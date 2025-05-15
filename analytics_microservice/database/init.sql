
CREATE DATABASE IF NOT EXISTS dealdeli;
USE dealdeli;


CREATE TABLE IF NOT EXISTS products (
    Product_id INT PRIMARY KEY AUTO_INCREMENT,
    Store VARCHAR(50),
    `Product Name` VARCHAR(500),
    `Price in GBP` DOUBLE,
    Category VARCHAR(70),
    Quantity INT,
    `Product URL` TEXT,
    `Image URL` TEXT
);
CREATE TABLE search_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(150),
    product_name VARCHAR(255),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
