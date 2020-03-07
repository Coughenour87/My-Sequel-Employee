DROP DATABASE IF EXISTS employees_DB;

CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,3) NOT NULL,
    department_id INT NOT NULL
);
CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
    role_id VARCHAR(30) NOT NULL,
    manager_id VARCHAR NOT NULL
    
);

INSERT INTO department (department_name)
VALUES ("Sales");

INSERT INTO department (department_name)
VALUES ("Engineering");

INSERT INTO department (department_name)
VALUES ("Fiance");

INSERT INTO department (department_name)
VALUES ("Legal");


INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100,000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", 80,000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 150,000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120,000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 125,000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Team Lead", 250,000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", 190,000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120,000, 2);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 1, 1);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Ashely", "Rodriguez", 2, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Tupik", 2, 2);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Malia", "Brown", 3, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Lourd", 4, null);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Allen", 4, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Christian", "Eckenrode", 2, 2);

SELECT * FROM employees_DB