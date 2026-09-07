CREATE DATABASE IF NOT EXISTS library_management;
USE library_management;

CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'STUDENT') NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_email (email)
);

CREATE TABLE books (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    isbn VARCHAR(30) NOT NULL,
    total_quantity INT NOT NULL,
    available_quantity INT NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_isbn (isbn),
    CHECK (total_quantity >= 0),
    CHECK (available_quantity >= 0),
    CHECK (available_quantity <= total_quantity)
);

CREATE TABLE issued_books (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE DEFAULT NULL,
    status ENUM('ISSUED', 'RETURNED') NOT NULL,
    PRIMARY KEY (id),
    KEY fk_issued_user (user_id),
    KEY fk_issued_book (book_id),
    CONSTRAINT fk_issued_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_issued_book FOREIGN KEY (book_id) REFERENCES books (id)
);

INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@library.com', 'admin123', 'ADMIN'),
('Student One', 'student1@library.com', 'student123', 'STUDENT'),
('Student Two', 'student2@library.com', 'student123', 'STUDENT');

INSERT INTO books (title, author, category, isbn, total_quantity, available_quantity) VALUES
('The Java Programming Language', 'James Gosling', 'Technology', '9780134685991', 5, 5),
('Clean Code', 'Robert C. Martin', 'Software Engineering', '9780132350884', 3, 3),
('Introduction to Algorithms', 'Thomas H. Cormen', 'Computer Science', '9780262033848', 4, 4),
('Atomic Habits', 'James Clear', 'Self Improvement', '9780735211292', 2, 2),
('The Alchemist', 'Paulo Coelho', 'Fiction', '9780061122411', 6, 6),
('Deep Work', 'Cal Newport', 'Productivity', '9781455586691', 3, 3);

INSERT INTO issued_books (user_id, book_id, issue_date, due_date, return_date, status) VALUES
(2, 1, '2026-08-01', '2026-08-15', NULL, 'ISSUED');
