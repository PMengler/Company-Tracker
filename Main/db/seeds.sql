INSERT INTO department (department_id, department_name)
VALUES (1, "Administration"),
       (2, "Management"),
       (3, "Human Resources"),
       (4, "Research and Development"),
       (5, "Information Technology");

INSERT INTO role (role_id, title, salary, department_id)
VALUES (1, "CEO", 250000, 1),
       (2, "Manager", 150000, 2),
       (3, "Head of Human Resources", 120000, 3),
       (4, "Developer", 90000, 4),
       (5, "IT Technician", 100000, 5);

INSERT INTO employee (employee_id, first_name, last_name, role_id, manager_id)
VALUES (10, "firstname", "lastname", #, null),
       (11, "firstname", "lastname", #, null),
       (12, "firstname", "lastname", #, null),
       (13, "firstname", "lastname", #, null),
       (14, "firstname", "lastname", #, null);
