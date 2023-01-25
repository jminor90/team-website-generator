const inquirer = require ('inquirer');
const fs = require('fs');

const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const questionType = [
  {
    message: 'Choose an employee type',
    type: 'list',
    choices: [
        'Engineer',
        'Intern'
    ],
    name: 'employeeType'
  }
  
]

const managerQuestions = [
  {
    message: `Name of Manager: `,
    type: `Input`,
    name: 'managerName'
  },
  {
    message: `Manager ID #: `,
    type: 'input',
    name: 'managerID'
  },
  {
    message: `Manager Email: `,
    type: 'input',
    name: 'managerEmail'
  }
]


function init() {
  inquirer
  .prompt(managerQuestions)
  .then(answer => new Manager(answer))
  .catch(error => {
    if(error){
      throw error
    }
  })

  //console.log("Nice one")

  //console.log(Employee)
}

init();