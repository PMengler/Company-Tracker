DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    department_id INTEGER PRIMARY KEY NOT NULL,
    department_name VARCHAR(30)
);

CREATE TABLE role (
    role_id INTEGER PRIMARY KEY NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    FOREIGN KEY (department_id)
    REFERENCES department(department_id)
    ON DELETE SET NULL
)

-- This table might still need some work to have manager id be null if an employee does not have a manager
CREATE TABLE employee (
    employee_id INTEGER PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role(role_id)
    ON DELETE SET NULL,
    manager_id INTEGER,
    FOREIGN KEY (manager_id)
    REFERENCES employee(employee_id)
    ON DELETE SET NULL
)