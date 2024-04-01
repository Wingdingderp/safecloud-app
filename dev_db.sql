CREATE USER 'scsmp'@'localhost' WITH PASSWORD 'scsmp';
CREATE DATABASE scsmp;
GRANT ALL PRIVILEGES ON scsmp.* TO 'scsmp'@'localhost';