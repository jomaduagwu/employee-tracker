INSERT INTO department (name)
VALUES ("HR"),
       ("Data Science"),
       ("Admin"),
       ("Sales & Marketing"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Data Engineer", '95000', 2),
       ("Data Analyst", '85000', 2),
       ("Sales Manager", '80000', 4),
       ("Salesman", '60000', 4),
       ("Admin Manager", '82000', 3),
       ("Admin Assistant", '60000', 3),
       ("Manager", '105000', 5),
       ("HR Manager", '75000', 1),
       ("HR Generalist", '60000', 1);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Johnson", 1, null),
       ("Scarlet", "Miller", 2, null),
       ("Ivy", "Park", 3, null),
       ("Jon", "Brown", 4, 3),
       ("Teresa", "Alvarez", 5, null ),
       ("Dwayne", "Smith", 6, 5 ),
       ("Anita", "Davis", 7, null),
       ("Hilda", "Moore", 8, null),
       ("Brierly", "White", 9, null);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ("Adam", "Johnson", 1, 5),
--        ("Scarlet", "Miller", 2, 8),
--        ("Ivy", "Park", 3, 9),
--        ("Jon", "Brown", 4, null),
--        ("Teresa", "Alvarez", 5, null ),
--        ("Dwayne", "Smith", 6, null ),
--        ("Anita", "Davis", 7, 6),
--        ("Hilda", "Moore", 8, null),
--        ("Brierly", "White", 9, null);