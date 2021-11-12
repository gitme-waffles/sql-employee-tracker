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
  console.log(`Connected to the companyEmployees_db database.`)
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
      console.log(table);
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
      console.log(table);
    }
    mainMenu();
  });
}

function viewAllEmployees() {
  const sql = ``;
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
  const sql = `SELECT 
  *
  FROM department`;
  inquirer.prompt(prompts.addRole).then((answers) => {
    const addRoleData = answers;
    db.query(sql, (err, result) => {
      // const table = cTable.getTable(result);
      // result.forEach((element) => {
      
        //   console.log(element.name)
      // })
      if (err) {
        console.error(err);
      } else {
        const dbDeptList = result.map(element => element.name);
        // console.log(dbDeptList);
        // console.log(table);
        
        inquirer.prompt([{
            type: "list",
            name: "roleUnderDept",
            message: "Which department does the role belong to?",
            choices: dbDeptList,
          }]).then((answers) => {
              console.log(answers);
              console.log(addRoleData);
              mainMenu();
            })
            
      }
    });
  })
}

function addEmployee() {}

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
        viewAllEmployees()
        break;
      case "Add a department":
        addDept();
        break;
      case "Add a role":
        addRole()
        break;
      case "Add an employee":
        addEmployee()
        break;        
          case "Exit":
            console.log("Bye!");
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
