menu = [
  {
    type: "list",
    name: "menuOption",
    message: "What would you like to do?",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employees role",
      "Exit",
    ],
  },
];

addDept = [
  {
    type: "input",
    name: "newDept",
    message: "What's the name of the new department?",
  },
];

addRole = [
  {
    type: "input",
    name: "newRoleName",
    message: "What's the name of the new role?",
  },
  {
    type: "input",
    name: "newRoleSalary",
    message: "What is the salary of the new role?",
  },
];

addEmployee = [
  {
    type: "input",
    name: "firstName",
    message: "What's the first name of the new employee?",
  },
  {
    type: "input",
    name: "lastName",
    message: "What's the last name of the new employee?",
  },
];

module.exports = { menu, addDept, addRole, addEmployee };
