INSERT INTO department (name)
VALUES ("HR"),
       ("Data Science"),
       ("Admin"),
       ("Sales & Marketing"),
       ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES ("Daa Analyst", '85000', 2),
       ("Salesman", '60000', 4),
       ("Admin Assistant", '60000' 3),
       ("Manager", '105000', 5),
       ("Data Engineer", '95000', 2),
       ("HR Manager", '75000', 1),
       ("HR Generalist", '60000', 1);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adam", "Johnson", 1, 5)
       ("Scarlet", "Miller", 2, null),
       ("Ivy", "Park", 3, null),
       ("Jon", "Brown", 4, null),
       ("Teresa", "Alvarez", 5, null ),
       ("Dwayne", "Smith", 6, null ),
       ("Anita", "Davis", 7, 6);