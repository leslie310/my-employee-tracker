DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL auto_increment,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)

);

CREATE TABLE employee_role (
    id INT NOT NULL auto_increment,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL auto_increment,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id)

);
