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
        'Intern',
        'None'
    ],
    name: 'employeeType'
  }
  
]

const managerQuestions = [
  {
    message: `Name of Manager: `,
    type: `input`,
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
  },
  {
    message: `Manager Office #: `,
    type: `input`,
    name: `managerOffice`
  }
]

const engineerQuestions = [
  {
    message: `Name of Engineer: `,
    type: `input`,
    name: `engineerName`,
  },
  {
    message: `Engineer ID#: `,
    type: `input`,
    name: `engineerID`,
  },
  {
    message: `Engineer Email`,
    type: `input`,
    name: `engineerEmail`
  },
  {
    message: `Engineer GitHub: `,
    input: `input`,
    name: `engineerGithub`
  }

]

const internQuestions = [
  {
    message: `Name of Intern: `,
    type: `input`,
    name: `internName`,
  },
  {
    message: `Intern ID#: `,
    type: `input`,
    name: `internID`,
  },
  {
    message: `Intern Email: `,
    type: `input`,
    name: `internEmail`
  },
  {
    message: `Intern School: `,
    input: `input`,
    name: `internSchool`
  }


]

const employeeArray = [];

const htmlArray = [];


/*
Prompt Manager Questions first cause only one Manager
Take manager answers and plug them into Manager.JS to make that class
use the info plugged into Manager.JS to generate HTML

Then Ask if next Employee is Intern, Engineer? 
(Does Employee encompass all?)
prompt questions for appropriate type
Use answers for that to generate HTML in the appropriate format
Rinse & Repeat

Tool to keep track of created employees - Array
use push method

All employees will have employee class and use Extend to add on other classes (Manager, Intern, Engineer)
*/
function init() {
  inquirer
  .prompt(managerQuestions)
  .then(answer => {
    new Manager(answer)
    employeeArray.push(answer)
    managerCard(answer)
    console.info(employeeArray)
    secondInit()
    
  }) // Tool to keep track of created employees, then ask further questions. (array)

  .catch(error => {
    if(error){
      throw error
    }
  })

}

/*
Email Link <a href="mailto:${Manager.managerEmail}">${Manager.managerEmail}</a>.<br>
Link to Github <a href="https://github.com/${Engineer.engineerGithub} target=_blank>${Engineer.engineerGithub}</a>"
*/

function managerCard(Manager) {
  const managerHTML = [
`
<div class="card m-3 bg-info" style="width: 18rem;">
<div div class="card-header">
  ${Manager.managerName}
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">ID: ${Manager.managerID}</li>
  <li class="list-group-item">Email: <a href="mailto:${Manager.managerEmail}">${Manager.managerEmail}</a></li>
  <li class="list-group-item">Office#: ${Manager.managerOffice}</li>
</ul>
</div>
`
  ]

  htmlArray.push(managerHTML)
  //console.log(htmlArray)
}

function secondInit () {
  
  inquirer
  .prompt(questionType)
  .then(answer => {
    handleInitialChoice(answer)}
    )
  .catch(console.error)
}

function handleInitialChoice (  answer ) {

  switch (answer.employeeType) {
    case 'Engineer':
      createEngineer();
      break;

    case 'Intern':
      createIntern();
      break;
    
    default:
      //console.log(answer)
      console.log("Good Bye!")
      generateHTML()
      //process.exit()
    
    }
  
}


function createEngineer() {
  inquirer
  .prompt(engineerQuestions)
  .then(answer => {
    new Engineer(answer)
    employeeArray.push(answer)

    engineerCard(answer)
    console.info(employeeArray)
    secondInit()
  })
    
  .catch(console.error)
  
}

function engineerCard(Engineer) {
  const engineerHTML = [
`
<div class="card m-3 bg-info" style="width: 18rem;">
<div div class="card-header">
  ${Engineer.engineerName}
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">ID: ${Engineer.engineerID}</li>
  <li class="list-group-item">Email: <a href="mailto:${Engineer.engineerEmail}">${Engineer.engineerEmail}</a></li>
  <li class="list-group-item">GitHub: <a href="https://github.com/${Engineer.engineerGithub}" target="_blank">${Engineer.engineerGithub}</a></li>
</ul>
</div>
`
  ]

  htmlArray.push(engineerHTML)
  //console.log(htmlArray)
}

function createIntern() {
  inquirer
  .prompt(internQuestions)
  .then(answer => {
    new Intern(answer)
    employeeArray.push(answer)

    internCard(answer)
    console.info(employeeArray)
    secondInit()
  })
  .catch(console.error)
}

function internCard(Intern) {
  const internHTML = [
`
<div class="card m-3 bg-info" style="width: 18rem;">
<div div class="card-header">
  ${Intern.internName}
</div>
<ul class="list-group list-group-flush">
  <li class="list-group-item">ID: ${Intern.internID}</li>
  <li class="list-group-item">Email: <a href="mailto:${Intern.internEmail}">${Intern.internEmail}</a></li>
  <li class="list-group-item">School: ${Intern.internSchool}</li>
</ul>
</div>
`
  ]

  htmlArray.push(internHTML)
  //console.log(htmlArray)
}

function generateHTML () {

  //console.log(htmlArray)

  const yayHTML = 
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
  rel="stylesheet" 
  integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" 
  crossorigin="anonymous">
  <title>Team Website</title>
</head>
<body>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg bg-success">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">TEAM TIME</a>
      </div>
    </nav>
  </div>
  <div class="container row">
`
  const footHTML = 
`
</div>
  <footer>
  Generated by jminor90
  </footer>
</body>
</html>
`

let cardHTML = ``;

for (let i = 0; i < htmlArray.length; i++) {
  cardHTML = cardHTML.concat(htmlArray[i]);
}

const finalHTML = yayHTML.concat(cardHTML).concat(footHTML)

//console.log(finalHTML);

writeHTML(finalHTML)

}

function writeHTML(finalHTML) {
  const html = finalHTML

  console.log(html)

  fs.writeFileSync('index.HTML', html, (err) => {
    if (err) {
      throw err;
    }

    console.info("File has been written!");

  })
  process.exit()
}

init();

