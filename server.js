// import modules
const inquirer = require("inquirer");
const mysql = require("mysql2")

// import prompts
const prompts = require("./utils/prompts");

function mainMenu() {
  inquirer.prompt(prompts.menu).then((answers) => {
    // console.log(answers);
    if (answers.menuOption == "Exit") {
      console.log("Bye!");
    }
  });
}

mainMenu();
