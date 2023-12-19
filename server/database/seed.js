const createAuthTable = `CREATE TABLE gymauth (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40),
    email VARCHAR(100),
    password VARCHAR(100),
    isVerified INT(1) DEFAULT 0
)`;

const createProductsTable = `CREATE TABLE products(
    p_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    p_name VARCHAR(40),
    p_price INT,
    p_category VARCHAR(40),
    p_sizes VARCHAR(40),
    p_colors VARCHAR(40),
    p_arms VARCHAR(40),
    p_code INT
)`;

const createOrdersTable = `CREATE TABLE orders(
    p_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    o_userid INT,
    o_name VARCHAR(40),
    o_email VARCHAR(40),
    o_price INT,
    o_items VARCHAR(500),
    o_status VARCHAR(30),
    o_address VARCHAR(100),
    o_date VARCHAR(100),
    o_code INT,
)`;