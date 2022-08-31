USE employees_db;

INSERT INTO department (id, name) 
VALUES 
('Software'),
('Finance'),
('Analyst'),
('Database'),
('Sales'),
('Security');

INSERT INTO employee_role (title, salary, department_id)
VALUES
('Web Developer', 50000,1),
('Accountant',10000,2),
('Data Analyst',30000,3),
('Database Adminastrator',10000,4),
('Sales Development',20000,5),
('Cyber Security Engineer',40000,6);

INSERT INTO employees (first_name,last_name, role_id,manager_id)
VALUES
('Jenny', 'Gomez',1, 486),
('Robert', 'Sanchez',2, 865),
('John','Smith',3,342),
('Melissa','White',4,223),
('Sara','Lee',5,784),
('Taylor','Lewis',6,985);

