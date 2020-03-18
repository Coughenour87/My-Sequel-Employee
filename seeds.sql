INSERT INTO department (department_name)
VALUES ("Sales");

INSERT INTO department (department_name)
VALUES ("Engineering");

INSERT INTO department (department_name)
VALUES ("Fiance");

INSERT INTO department (department_name)
VALUES ("Legal");


INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", 80000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 125000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Team Lead", 250000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Lawyer", 190000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Software Engineer", 120000, 2);


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
VALUES ("Tim", "Allen", 4, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Christian", "Eckenrode", 2, 2);