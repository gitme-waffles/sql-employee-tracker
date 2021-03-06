-- SELECT 
--   R.title AS title, R.department_id AS `Role ID`, D.id AS `Dept. ID`, D.name AS `Name` 
-- FROM department AS D 
-- INNER JOIN `role` AS R ON D.id = R.department_id;

-- SELECT
--     CONCAT(E.first_name, ", ", E.last_name) AS Employee, R.title AS `Role`, D.name AS `Dept.`
-- FROM employee AS E
-- INNER JOIN `role` AS R ON E.role_id = R.id
-- INNER JOIN department AS D ON R.department_id = D.id;

            --  *** View All Role Details ***
-- SELECT 
--   R.id AS "ID", R.title AS "Job Title", D.name AS "Dept.", R.salary AS Salary
-- FROM role AS R
-- INNER JOIN department AS D ON  R.department_id = D.id;

-- SELECT 
--   E.id AS "ID", CONCAT(E.first_name, " ", E.last_name) AS Employee, R.title AS "Job Title", R.id AS Job_ID, D.name AS "Dept.", R.salary AS Salary, CONCAT(E.first_name, " ", E.last_name) AS Manager
-- FROM employee AS E
-- INNER JOIN role AS R ON R.id = E.role_id
-- INNER JOIN department AS D ON  R.department_id = D.id;


-- SELECT *
--     `name` AS `Dept.`, id AS ID
-- FROM department

                    -- *** VIEW ALL EMPLOYEES ***
-- SELECT 
--   E.id AS "ID", CONCAT(E.first_name, " ", E.last_name) AS Employee, R.title AS "Job Title", D.name AS Department, R.salary AS Salary, CONCAT(EMP.first_name, " ", EMP.last_name) AS Manager
-- FROM employee AS E
-- INNER JOIN role AS R ON R.id = E.role_id
-- INNER JOIN department AS D ON  R.department_id = D.id
-- LEFT JOIN employee AS EMP ON EMP.id = E.manager_id;

            -- *** MOCK UP ***
-- SELECT
--     E.first_name AS Employee, M.first_name AS Manager
-- FROM employee AS E 
-- INNER JOIN manager AS M on M.id = E.manager_id

              -- *** Request Job Title and Manager data ***
-- SELECT 
--  R.id AS id,  R.title AS title, CONCAT(EMP.first_name, " ", EMP.last_name) AS Manager, EMP.id AS Managers_ID
-- FROM employee AS E
-- RIGHT JOIN role AS R ON R.id = E.role_id
-- LEFT JOIN employee AS EMP ON EMP.id = E.manager_id;

-- UPDATE [table]
-- SET [key] = "Candide"
-- WHERE id = 2;

      --  *** FULL OUTER JOIN ***
SELECT 
 R.id AS id,  R.title AS title, CONCAT(E.first_name, " ", E.last_name) AS employee, E.id AS employeeId
FROM employee AS E
FULL OUTER JOIN role AS R ON R.id = E.role_id
ORDER BY R.id;
