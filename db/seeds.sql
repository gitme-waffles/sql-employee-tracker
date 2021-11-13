INSERT INTO department (`name`)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO `role` (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)  
VALUES  ("John", "Smith", 1, NULL),
        ("Mike", "Chan", 2, 1),
        ("Hugh", "Mungus", 3, NULL),
        ("Paul", "Mcartney", 4, 3),
        ("George", "Harrison", 5, NULL),
        ("John", "Lemon", 6, 5),
        ("Ringo", "Star", 7, NULL),
        ("Deez", "Nughts", 8, 7);