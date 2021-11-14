// import modules
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

// import prompts
const prompts = require("./utils/prompts");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "sqlROOT",
    database: "companyEmployees_db",
  },
  console.info(`Connected to the companyEmployees_db database.`)
);

function viewAllDepts() {
  const sql = `SELECT 
  id AS ID, name AS "Dept."
  FROM department`;
  db.query(sql, (err, result) => {
    const table = cTable.getTable(result);
    if (err) {
      console.error(err);
    } else {
      console.info(table);
    }
    mainMenu();
  });
}

function viewAllRoles() {
  const sql = `SELECT 
  R.id AS ID, R.title AS "Job Title", D.name AS "Dept.", R.salary AS Salary
FROM role AS R
INNER JOIN department AS D ON  R.department_id = D.id;`;
  db.query(sql, (err, result) => {
    const table = cTable.getTable(result);
    if (err) {
      console.error(err);
    } else {
      console.info(table);
    }
    mainMenu();
  });
}

function viewAllEmployees() {
  const sql = `SELECT 
  E.id AS "ID", CONCAT(E.first_name, " ", E.last_name) AS Employee, R.title AS "Job Title", D.name AS Department, R.salary AS Salary, CONCAT(EMP.first_name, " ", EMP.last_name) AS Manager
FROM employee AS E
INNER JOIN role AS R ON R.id = E.role_id
INNER JOIN department AS D ON  R.department_id = D.id
LEFT JOIN employee AS EMP ON EMP.id = E.manager_id;`;
  db.query(sql, (err, result) => {
    const table = cTable.getTable(result);
    if (err) {
      console.error(err);
    } else {
      console.log(table);
    }
    mainMenu();
  });
}

function addDept() {
  inquirer.prompt(prompts.addDept).then((answer) => {
    const sql = `INSERT INTO department (name)
    VALUES  ("${answer.newDept}");`;
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(answer.newDept + "department added!");
      }
    });
    mainMenu();
  });
}

function addRole() {
  inquirer.prompt(prompts.addRole).then((addRoleData) => {
    const sql = `SELECT 
    *
    FROM department`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        const dbDeptList = result.map((department) => department.name);
        inquirer
          .prompt([
            {
              type: "list",
              name: "roleUnderDept",
              message: "Which department does the role belong to?",
              choices: dbDeptList,
            },
          ])
          .then((answers) => {
            const chosenDept = result.filter(
              (department) => department.name == answers.roleUnderDept
            );
            // string literal  over 2 lines
            const sql = `INSERT INTO role (title, salary, department_id)
            VALUES		(\"${addRoleData.newRoleName}\", ${addRoleData.newRoleSalary}, ${chosenDept[0].id})`;
            // add to database
            db.query(sql, (err, result) => {
              if (err) {
                console.error(err);
              } else {
                console.info(`${addRoleData.newRoleName} added to database!`);
              }
            });
            mainMenu();
          });
      }
    });
  });
}

function addEmployee() {
  inquirer.prompt(prompts.addEmployee).then((addEmployeeData) => {
    const sql = `SELECT 
    R.id AS titleId,  R.title AS title, CONCAT(EMP.first_name, " ", EMP.last_name) AS manager, EMP.id AS managersId
   FROM employee AS E
   RIGHT JOIN role AS R ON R.id = E.role_id
   LEFT JOIN employee AS EMP ON EMP.id = E.manager_id;`;
    db.query(sql, (err, roleAndManagerData) => {
      if (err) {
        console.error(err);
      } else {
        // console.log(roleAndManagerData);
        const dbRoleList = roleAndManagerData.map((role) => role.title);
        // const dbRoleList = roleAndManagerData.filter(role => role.manager == !null);
        inquirer
          .prompt([
            {
              type: "list",
              name: "choiceOfRole",
              message: "What is the employee's role?",
              choices: dbRoleList,
            },
          ])
          .then((chosenRole) => {
            let initManagerList = ["None"];
            const pulledManagerList = roleAndManagerData.map(
              (manager) => manager.manager
            );

            let managerList = initManagerList.concat(
              pulledManagerList.filter((el) => el != null)
            );
            // console.log(managerList);
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "choiceOfManager",
                  message: "Choose the Manager",
                  choices: managerList,
                },
              ])
              .then((answer) => {
                let chosenManager = [];

                if (answer.choiceOfManager == "None") {
                  chosenManager = roleAndManagerData.filter(
                    (el) => el.title == chosenRole.choiceOfRole
                  );
                } else {
                  chosenManager = roleAndManagerData.filter(
                    (manager) => manager.manager == answer.choiceOfManager
                  );
                }
                // console.log(
                //   `ConLog employee data: ` + JSON.stringify(addEmployeeData)
                // );
                // console.log(
                //   `ConLog Chosen Role: ` + JSON.stringify(chosenRole)
                // );
                // console.log(
                //   `ConLog - manager choice: ` + JSON.stringify(chosenManager)
                // );

                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)  
VALUES  ("${addEmployeeData.firstName}", "${addEmployeeData.lastName}", ${chosenManager[0].titleId}, ${chosenManager[0].managersId});`;
                db.query(sql, (err, result) => {
                  if (err) {
                    console.error(err);
                  } else {
                    console.log(`Employee "${addEmployeeData.firstName} ${addEmployeeData.lastName}", added to the database`);
                    mainMenu();
                  }
                });
              })
          });
      }
    });
  });
}

function updateEmployeeRole() {
  // CONCAT(E.first_name, " ", E.last_name)
  const sql = `SELECT *
FROM employee AS E;`;
  db.query(sql, (err, result) => {
    console.log(result);
    if (err) {
      console.log(err);
    } else {
      const listOfEmployees = result.map((element) => element);
      console.log("ConLog db reulst: " + result);
    }
  });
}

function mainMenu() {
  inquirer.prompt(prompts.menu).then((answers) => {
    // console.log(answers);
    switch (answers.menuOption) {
      case "View all departments":
        viewAllDepts();
        break;
      case "View all roles":
        viewAllRoles();
        break;
      case "View all employees":
        viewAllEmployees();
        break;
      case "Add a department":
        addDept();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employees role":
        updateEmployeeRole();
        break;
      case "Exit":
        console.log("Bye!");
        process.exit();
        break;
      default:
        break;
    }
  });
}

function init() {
  mainMenu();
}

init();
