CREATE TABLE search_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(150),
    product_name VARCHAR(255),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
