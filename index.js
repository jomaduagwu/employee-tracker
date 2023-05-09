const inquirer = require(inquirer);
const fs = require('fs');
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

const questions = [
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'View All Roles',
    'Add Role', 'View All Departments', 'Add Department',  'Update  an Employee Role'],
    },
    {
      type: 'input',
      name: 'department',
      message: 'What is the name of the department?',
    },
    {
      type: 'input',
      name: 'role_name',
      message: 'Enter is the name of the role?',
    },
        {
        type: 'input',
        name: 'role_salary',
        message: 'What is the salary  for that role?',
        },
        {
        type: 'list',
        name: 'role_department',
        message: 'What department does the role belong to?',
        choices: ['Marketing',  'Sales', 'HR', 'Operations'],
        },
    {
      type: 'input',
      name: 'employee_first',
      message: "What is the employee's first name?",
    },
    {
        type: 'input',
        name: 'employee_last',
        message: "What is the employee's last name?",
      },
      {
        type: 'list',
        name: 'employee_role',
        message: "What is the employee's role?",
        choices: [],
      },
      {
        type: 'input',
        name: 'manager',
        message: "Who is the employee's manager?",
      },
    {
      type: 'list',
      name: 'employee_update',
      message: 'Select an employee to update',
      choices: [],
    },
    {
      type: 'input',
      name: 'employee_update_role',
      message: 'Enter the new role for the employee.',
    },
  ];
  
  // update code below
  inquirer.prompt(questions).then((answers) => {
    const htmlPageContent = generateHTML(answers);

  // update code  below
    fs.writeFile('index.html', htmlPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created index.html!')
    );
  });

// .promise() function on Connections, to "upgrade" an 
//  existing non-promise connection to use promise
con.promise().query("SELECT 1")
  .then( ([rows,fields]) => {
    console.log(rows);
  })
  .catch(console.log)
  .then( () => con.end());