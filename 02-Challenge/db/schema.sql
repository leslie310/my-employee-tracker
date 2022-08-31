DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT  auto_increment NOT NULL PRIMARY KEY,
    name VARCHAR(30) 
    

);

CREATE TABLE employee_role (
    id INT  auto_increment NOT NULL PRIMARY KEY,
    title VARCHAR(30)
    salary DECIMAL 
    department_id INT 
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL auto_increment NOT NULL PRIMARY KEY,
    first_name VARCHAR (30) 
    last_name VARCHAR (30) 
    role_id INT ,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)

);

 SOURCE seed.sql;
