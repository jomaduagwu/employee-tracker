const inquirer = require(inquirer);
const fs = require('fs');
// get the client
const mysql = require('mysql2');
// require console.table to show table
const cTable = require('console.table');
// require('dotenv').config();

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  // port: '3001',
  user: 'root',
  password: 'ekojonwa23',
  // password: process.env.db_password, need to change password
  database: 'employee_db'
});


// connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database"); //console.log('connected as id' + connection.threadId);
  startPrompt(); // need a function to start up the questions
});

// function to view all departments
function viewAllDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    // prompt the user to choose an action
    start();
    // connection.end();
  });
}

// function to view all roles
function viewAllRoles() {
  connection.query(
    `SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    LEFT JOIN department ON roles.department_id = department.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      // prompt the user to choose an action
      start();
      // connection.end();
    }
  );
}

// function to view all employees
function viewAllEmployees() {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      // prompt the user to choose an action
      start();
      // connection.end();
    }
  );
}

// function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the name of the department:"
      }
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        { name: answer.name },
        (err, res) => {
          if (err) throw err;
          console.log(`${res.affectedRows} department added!\n`);
          // prompt the user to choose an action
          start();
          // connection.end();
        }
      );
    });
}

// function to add a role
function addRole() {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the role:"
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary of the role:"
        },
        {
          type: "list",
          name: "department",
          message: "Choose the department:",
          choices: res.map((department) => ({
            name: department.name,
            value: department.id
          }))
        }
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} role added!\n`);
            connection.end();
          });
        });
      });

// Function to add an employee
function addEmployee() {
  inquirer.prompt([
    {
      name: 'first_name',
      type: 'input',
      message: 'Enter the employee\'s first name:'
    },
    {
      name: 'last_name',
      type: 'input',
      message: 'Enter the employee\'s last name:'
    },
    {
      name: 'role_id',
      type: 'number',
      message: 'Enter the employee\'s role id:'
    },
    {
      name: 'manager_id',
      type: 'number',
      message: 'Enter the employee\'s manager id:'
    }
  ]).then(answer => {
    connection.query('INSERT INTO role SET?', answer, (err, res) => {
      if (err) throw err;
      console.log('Employee has been added');
      connection.end();
    });
  });
}










// .promise() function on Connections, to "upgrade" an 
//  existing non-promise connection to use promise
connection.promise().query("SELECT 1")
  .then( ([rows,fields]) => {
    console.log(rows);

const questions = [
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View All Employees',            
                'View All Roles',
                'View All Departments',
                'Add Employee',
                'Add Role',                 
                'Add Department',  
                'Update  an Employee Role',
                'Update an Employee Manager',
                'Delete an Employee',
                'Delete a Role',
                'Delete a Department'],
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

  })
  .catch(console.log)
  .then( () => connection.end());