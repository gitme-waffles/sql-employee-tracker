-- SELECT 
--   R.title AS title, R.department_id AS `Role ID`, D.id AS `Dept. ID`, D.name AS `Name` 
-- FROM department AS D 
-- INNER JOIN `role` AS R ON D.id = R.department_id;

-- SELECT
--     CONCAT(E.first_name, ", ", E.last_name) AS Employee, R.title AS `Role`, D.name AS `Dept.`
-- FROM employee AS E
-- INNER JOIN `role` AS R ON E.role_id = R.id
-- INNER JOIN department AS D ON R.department_id = D.id;

-- SELECT 
--   R.id AS "ID", R.title AS "Job Title", D.name AS "Dept.", R.salary AS Salary
-- FROM role AS R
-- INNER JOIN department AS D ON  R.department_id = D.id;

-- SELECT 
--   E.id AS "ID", CONCAT(E.first_name, " ", E.last_name) AS Employee, R.title AS "Job Title", D.name AS "Dept.", R.salary AS Salary, CONCAT(E.first_name, " ", E.last_name) AS Manager
-- FROM employee AS E
-- INNER JOIN employee AS Emp
-- INNER JOIN role AS R ON R.id = E.role_id
-- INNER JOIN department AS D ON  R.department_id = D.id;

SELECT *
--     `name` AS `Dept.`, id AS ID
FROM department