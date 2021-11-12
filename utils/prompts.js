menu = [
  {
    type: "list",
    name: "menuOption",
    message: "Select an option",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
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

module.exports = { menu, addDept };
