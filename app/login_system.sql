use login_system;


-- User Authentication Queries:

-- For user Registration
INSERT INTO users (username, password, email) VALUES ('Uardian', '$2b$10$xURDUWCWM5JrVjChK3J3JOzDvEu2X56hlj.8VdFf2MKYFrqfuT/6W', 'Uardian@example.com');


-- For user login
SELECT * FROM users WHERE username = 'Uardian';



SELECT user, host FROM mysql.user;

CREATE USER 'Uardian'@'localhost' IDENTIFIED BY 'Uardian';
GRANT ALL PRIVILEGES ON login_system.* TO 'Uardian'@'localhost';
FLUSH PRIVILEGES;

select * from users;

