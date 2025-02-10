create database SathmagaDB;
use SathmagaDB;

-- Create User Table
CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    NIC VARCHAR(20) NOT NULL UNIQUE,
    profile_pic VARCHAR(255),
    contact VARCHAR(15),
    role VARCHAR(50) NOT NULL
);

-- Create Admin Table
CREATE TABLE Admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Create Teacher Table
CREATE TABLE Teacher (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);


-- Create CardMarker Table
CREATE TABLE CardMarker (
    card_marker_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Create Grade Table
CREATE TABLE Grade (
    grade_id INT AUTO_INCREMENT PRIMARY KEY,
    grade_name VARCHAR(50) NOT NULL
);

-- Create Subject Table
CREATE TABLE Subject (
    subject_id INT AUTO_INCREMENT PRIMARY KEY,
    subject_name VARCHAR(100) NOT NULL
);

-- Create Grade_Subject Table
CREATE TABLE Grade_Subject (
    grade_subject_id INT AUTO_INCREMENT PRIMARY KEY,
    grade_id INT NOT NULL,
    subject_id INT NOT NULL,
    teacher_id INT NOT NULL,
    FOREIGN KEY (grade_id) REFERENCES Grade(grade_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES Subject(subject_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES Teacher(teacher_id) ON DELETE CASCADE
);


-- Create Attendance Table
CREATE TABLE Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    grade_subject_id INT NOT NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    reason VARCHAR(255),
    marked_by INT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES User(user_id),
    FOREIGN KEY (grade_subject_id) REFERENCES Grade_Subject(grade_subject_id),
    FOREIGN KEY (marked_by) REFERENCES User(user_id)
);

-- Create Attendance_Report Table
CREATE TABLE Attendance_Report (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    generated_by INT NOT NULL,
    date DATE NOT NULL,
    report_type VARCHAR(50) NOT NULL,
    FOREIGN KEY (generated_by) REFERENCES User(user_id)
);

-- Create Payment Table
CREATE TABLE Payment (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    student_id INT NOT NULL,
    subject_id INT NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES User(user_id),
    FOREIGN KEY (subject_id) REFERENCES Subject(subject_id)
);

-- Create Student Table
CREATE TABLE Student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);