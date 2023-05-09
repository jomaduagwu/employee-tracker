INSERT INTO department (name)
VALUES ("HR"),
       ("Data Science"),
       ("Engineering"),
       ("Admin"),
       ("Sales"),
       ("Marketing"),
       ("Finance");

INSERT INTO roles (title, salary, department_id)
VALUES ("Analyst", 1),
       ("Salesman", 2),
       ("Admin Assistant", 3),
       ("Manager", 4),
       ("Machine Learning", 4),
       ("Game Design", 1 ),
       ("Cloud Development", 1);
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Adam", 1),
       ("Scarlet", 2),
       ("Ivy", 3),
       ("Jon", 4),
       ("Teresa", 4),
       ("Dwayne", 1 ),
       ("Anita", 1);