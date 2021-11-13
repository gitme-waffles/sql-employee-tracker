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
      // const table = cTable.getTable(result);
      // result.forEach((element) => {

      //   console.log(element.name)
      // })
      if (err) {
        console.error(err);
      } else {
        const dbDeptList = result.map((element) => element.name);
        console.log(`ConLog dbDepList: ` + dbDeptList);
        console.log(`ConLog query result: ` + result.id);
        // console.log(table);

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
            // console.log(`ConLog after dbDept Inquiry: ` + JSON.stringify(result));
            // console.log(result);
            // check result == roleUnderDept
            const chosenDept  = result.filter(department => department.name == answers.roleUnderDept)
            // console.log(chosenDept);
            chosenDept[0].id
            addRoleData.newRoleName
            addRoleData.newRoleSalary

            const sql = `INSERT INTO role (title, salary, department_id)
            VALUES		(\"${addRoleData.newRoleName}\", ${addRoleData.newRoleSalary}, ${chosenDept[0].id})`;
            db.query(sql, (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log(`${addRoleData.newRoleName} added to database!`);
              }
            });
            mainMenu();
          });
      }
    });
  });
}

function addEmployee() {}

function updateEmployeeRole() {
  // CONCAT(E.first_name, " ", E.last_name)
  const sql = `SELECT *
FROM employee AS E;`;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const listOfEmployees = result.map((element) => element);
      console.log("ConLog db reulst: " + result);
      console.log(listOfEmployees);
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
