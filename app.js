const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];

function appMenu() {

  function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      {
      type: "input",
      name: "managerName",
      message: "What is your name?",
      validate: managerName => {
        const pass = /^[A-Za-z]+$/.test(managerName);
        if (pass) {
          return true;
        } else {
          console.log("Incorrect characters. Please use only upper or lower case letters.")
          return false;
        }
      }
      },
      {
        type: "input",
        name: "managerId",
        message: "What is your employee ID?",
        validate: managerId => {
          const pass = /^[1-9]\d*S/.test(managerId);
          if (pass) {
            return true;
          } else {
            console.log("Incorrect input. Please enter a valid Employee ID.")
          }
        }
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is your email address?",
        validate: managerEmail => {
          const pass = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(managerEmail);
          if (pass) {
            return true;
          } else {
            console.log("Invalid email address. Please enter a valid email address.")
          }
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is your offic phone number?",
        validate: managerOfficeNumber => {
          const pass = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(managerOfficeNumber);
          if (pass) {
            return true;
          } else {
            console.log("Invalid input. Please enter a valid phone number.");
            return false;
          }
        }
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      idArray.push(answers.managerId);
      createTeam();
    });
  }

  function createTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      switch(userChoice.memberChoice) {
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        buildTeam();
      }
    });
  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is your name?",
        validate: engineerName => {
          const pass = /^[A-Za-z]+$/.test(engineerName);
          if (pass) {
            return true;
          } else {
            console.log("Invalid characters. Please use only upper and lower case letters.")
            return false;
          }
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is your employee ID?",
        validate: engineerId => {
          const pass = /^[1-9]\d*S/.test(engineerId);
          if (pass) {
            return true;
          } else {
            console.log("Invalid. This field can't be empty.");
            return false;
          }
        }
      },
      {
        type: "input";
        name: "engineerEmail",
        message: "What is your email address?",
        validate: engineerEmail => {
          const pass = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(engineerEmail);
          if (pass) {
            return true;
          } else {
            console.log("Invalid email. Please enter a valid email address.");
            return false;
          }
        }
      },
      {
        type: "input",
        name: "engineerUsername",
        message: "What is your GitHub username?",
        validate: engineerUsername => {
          const pass = /^[0-9a-zA-Z]+$/.test(engineerUsername);
          if (pass) {
            return true;
          } else {
            console.log("Invalid, please do not leave this field blank.");
            return false;
          }
        }
      },
    ]).then(answers => {
      //
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE ENGINEER OBJECT INSTANTIATED WITH THE ENGINEER CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS 
      //    TO THE ENGINEER CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE ENGINEER VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE ENGINERR ID TO THE idArray ARRAY
      // 
 
      createTeam();
    });
  }

  function addIntern() {
    inquirer.prompt([
      //
      // YOUR CODE HERE
      // CREATE OBJECTS OF QUESTIONS FOR ENGINEER
      //
    ]).then(answers => {
      //
      // YOUR CODE HERE
      // 1. CREATE A VARIABLE TO STORE THE INTERN OBJECT INSTANTIATED WITH THE INTERN CLASS, PASSING ANSWERS PROPERTIES AS INPUT AURGUMENTS 
      //    TO THE INTERN CLASS CONSTRUCTOR
      // 2. ADD (PUSH) THE INTERN VARIABLE TO the teamMembers ARRAY
      // 3. ADD (PUSH) THE INTERN ID TO THE idArray ARRAY
      // 

      createTeam();
    });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();

}


appMenu();
