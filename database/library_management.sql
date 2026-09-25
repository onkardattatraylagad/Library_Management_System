CREATE DATABASE IF NOT EXISTS library_management;
USE library_management;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'STUDENT') NOT NULL,
    PRIMARY KEY (id), UNIQUE KEY unique_email (email)
);

CREATE TABLE IF NOT EXISTS books (
    id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    author VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,
    isbn VARCHAR(30) NOT NULL,
    total_quantity INT NOT NULL,
    available_quantity INT NOT NULL,
    PRIMARY KEY (id), UNIQUE KEY unique_isbn (isbn),
    CHECK (total_quantity >= 0), CHECK (available_quantity >= 0), CHECK (available_quantity <= total_quantity)
);

CREATE TABLE IF NOT EXISTS issued_books (
    id BIGINT NOT NULL AUTO_INCREMENT, user_id BIGINT NOT NULL, book_id BIGINT NOT NULL,
    issue_date DATE NOT NULL, due_date DATE NOT NULL, return_date DATE DEFAULT NULL,
    status ENUM('ISSUED', 'RETURNED') NOT NULL, PRIMARY KEY (id),
    KEY fk_issued_user (user_id), KEY fk_issued_book (book_id),
    CONSTRAINT fk_issued_user FOREIGN KEY (user_id) REFERENCES users (id),
    CONSTRAINT fk_issued_book FOREIGN KEY (book_id) REFERENCES books (id)
);

INSERT IGNORE INTO users (name, email, password, role) VALUES
('Root Administrator', 'root', 'root', 'ADMIN'),
('Aarav Sharma', 'student1@library.com', 'student123', 'STUDENT'),
('Ananya Patel', 'student2@library.com', 'student123', 'STUDENT'),
('Rohan Mehta', 'student3@library.com', 'student123', 'STUDENT'),
('Isha Gupta', 'student4@library.com', 'student123', 'STUDENT'),
('Vivaan Shah', 'student5@library.com', 'student123', 'STUDENT'),
('Diya Joshi', 'student6@library.com', 'student123', 'STUDENT'),
('Arjun Nair', 'student7@library.com', 'student123', 'STUDENT'),
('Meera Rao', 'student8@library.com', 'student123', 'STUDENT'),
('Kabir Singh', 'student9@library.com', 'student123', 'STUDENT'),
('Sara Khan', 'student10@library.com', 'student123', 'STUDENT');

INSERT IGNORE INTO books (title, author, category, isbn, total_quantity, available_quantity) VALUES
('The Java Programming Language', 'James Gosling', 'Technology', '9780134685991', 5, 5),
('Clean Code', 'Robert C. Martin', 'Software Engineering', '9780132350884', 5, 5),
('Introduction to Algorithms', 'Thomas H. Cormen', 'Computer Science', '9780262033848', 5, 5),
('Atomic Habits', 'James Clear', 'Self Improvement', '9780735211292', 5, 5),
('The Alchemist', 'Paulo Coelho', 'Fiction', '9780061122411', 5, 5),
('Deep Work', 'Cal Newport', 'Productivity', '9781455586691', 5, 5),
('Design Patterns', 'Erich Gamma', 'Technology', '9780201633610', 5, 5),
('Database System Concepts', 'Abraham Silberschatz', 'Database', '9780078022159', 5, 5),
('The Pragmatic Programmer', 'David Thomas', 'Technology', '9780135957059', 5, 5),
('Refactoring', 'Martin Fowler', 'Software Engineering', '9780134757599', 5, 5);
