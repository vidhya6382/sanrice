-- Run once in MySQL (MySQL Workbench or the mysql command line) as root.
-- Change the password, and put the same password in backend\.env

CREATE DATABASE IF NOT EXISTS san_rice CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'san_user'@'localhost' IDENTIFIED BY 'StrongPassword123';
GRANT ALL PRIVILEGES ON san_rice.* TO 'san_user'@'localhost';
FLUSH PRIVILEGES;
