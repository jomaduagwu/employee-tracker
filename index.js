const inquirer = require('inquirer');
const fs = require('fs'); // needed?
// get the client
const mysql = require('mysql2');
// require console.table to show table
const cTable = require('console.table');
const { connect } = require('http2');
require('dotenv').config(); // needed?
console.log(process.env);

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'password', //process.env.DB_PASSWORD
  database: 'employee_db'
});


// connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database"); //console.log('connected as id' + connection.threadId);
  start(); // need a function to start up the questions
});




// .promise() function on Connections, to "upgrade" an 
//  existing non-promise connection to use promise
// connection.promise().query("SELECT 1")
//   .then( ([rows,fields]) => {
//     console.log(rows);

//   });

const start = () => {
  inquirer
    .prompt({
      type: 'list',
      name: 'menuChoice',
      message: 'What would you like to do?',
      choices: ['View All Departments',            
                'View All Roles',
                'View All Employees',
                'Add New Department',
                'Add New Role',                 
                'Add New Employee',  
                'Update an Employee Role',
                // 'Update an Employee Manager',
                'Delete an Employee',
                'Delete a Role',
                'Delete a Department',
                'View Employees by Department',
                'View Total Utilized Budget by Department',
                'Exit'],
    })
    .then((answer) => {
      console.log(answer.menuChoice);
        switch (answer.menuChoice) {
          case 'View All Departments':
            viewAllDepartments();
            break;
          case 'View All Roles':
            viewAllRoles();
            break;
          case 'View All Employees':
            viewAllEmployees();
            break;
          case 'Add New Department':
            addDepartment();
            break;
          case 'Add New Role':
            addRole();
            break;
          case 'Add New Employee':
            addEmployee();
            break;
          case 'Update an Employee Role':
            updateEmployee();
            break;            
          case 'Delete an Employee':
            deleteEmployee();
            break; 
          case 'Delete a Role':
            deleteRole();
            break; 
          case 'Delete a Department':
            deleteDepartment();
            break; 
          case 'View Employees by Department':
            viewEmployeesByDepartment();
            break;
          case 'View Total Utilized Budget by Department':
            viewDepartmentBudget();
            break;
          case 'Exit':
            connection.end();
            break;        
        }
    })
  }

// function to view all departments
function viewAllDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    err ? console.error(err) : console.table(res);
    // if (err) throw err;
    // console.table(res);
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
    LEFT JOIN department ON role.department_id = department.id`,
    (err, res) => {
      err ? console.error(err) : console.table(res);
      // if (err) throw err;
      // console.table(res);
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
      err ? console.error(err) : console.table(res);
      // if (err) throw err;
      // console.table(res);
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
        name: "addDept",
        message: "Enter the name of the department you'd like to add:"
      }
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        { name: answer.addDept},
        (err, res) => {
          err ? console.error(err) : console.table(`${res.affectedRows} department added!\n`);
          // if (err) throw err;
          // console.log(`${res.affectedRows} department added!\n`);
          // prompt the user to choose an action
          start();
          // connection.end();
        }
      );
    });
}

// function to add a role
function addRole() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Enter the title of the role you'd like to add:"
        },
        {
          type: "input",
          name: "salary",
          message: "Enter the salary for this role:"
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
            err ? console.error(err) : console.table(`${res.affectedRows} role added!\n`);
            // if (err) throw err;
            // console.log(`${res.affectedRows} role added!\n`);
            // connection.end();
            start();
          });
        });
      });
    };
// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter the employee\'s first name:'
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter the employee\'s last name:'
      },
      {
        name: 'roleId',
        type: 'number',
        message: 'Enter the employee\'s role id:'
      },
      {
        name: 'managerId',
        type: 'number',
        message: 'Enter the employee\'s manager id:'
      }
    ]).then(answer => {
      connection.query('INSERT INTO employee SET?', 
      {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.roleId,
        manager_id: answer.managerId
      },
      (err, res) => {
        err ? console.error(err) : console.log('Employee has been added');
        // if (err) throw err;
        // console.log('Employee has been added');
        // connection.end();
        start();
    });
  });
}

// function to update an employee
function updateEmployee () {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeToUpdate",
          message: "Select an employee to update:",
          choices: res.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          }))
        },
        {
          type: "input",
          name: "newRoleId",
          message: "Enter the new role ID for the employee:"
        }
      ])
      .then((answer) => {
        connection.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [answer.newRoleId, answer.employeeToUpdate],
          (err, res) => {
            err ? console.error(err) : console.log("Employee role updated successfully!\n");
            // if (err) throw err;
            // console.log("Employee role updated successfully!\n");
            start();
          }
        );
      });
  });
}

// BONUS function to delete an employee
function deleteEmployee () {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeToDelete",
          message: "Select an employee to delete:",
          choices: res.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
          }))
        }
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM employee WHERE id = ?",
          answer.employeeToDelete,
          (err, res) => {
            err ? console.error(err) : console.log("Employee deleted successfully!\n");
            // if (err) throw err;
            // console.log("Employee deleted successfully!\n");
            start();
          }
        );
      });
  });
}

// BONUS function to delete a role
function deleteRole () {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "roleToDelete",
          message: "Select a role to delete:",
          choices: res.map((role) => ({
            name: role.title,
            value: role.id
          }))
        }
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM role WHERE id = ?",
          answer.roleToDelete,
          (err, res) => {
            err ? console.error(err) : console.log("Role deleted successfully!\n");
            // if (err) throw err;
            // console.log("Role deleted successfully!\n");
            start();
          }
        );
      });
  });
}

//BONUS function to delete a department
function deleteDepartment () {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentToDelete",
          message: "Select a department to delete:",
          choices: res.map((department) => ({
            name: department.name,
            value: department.id
          }))
        }
      ])
      .then((answer) => {
        connection.query(
          "DELETE FROM department WHERE id = ?",
          answer.departmentToDelete,
          (err, res) => {
            err ? console.error(err) : console.log("Department deleted successfully!\n");
            // if (err) throw err;
            // console.log("Department deleted successfully!\n");
            start();
          }
        );
      });
  });
}

// BONUS function to view employees by department
function viewEmployeesByDepartment() {
  inquirer
    .prompt({
      type: 'list',
      name: 'department',
      message: 'Select a department to view employees:',
      choices: ['HR', 'Data Science', 'Admin', 'Sales & Marketing', 'Finance'],
    })
    .then((answer) => {
      const department = answer.department;
      const query = `
        SELECT e.first_name, e.last_name, r.title, d.name AS department
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        WHERE d.name = ?
      `;
      connection.query(query, [department], (err, res) => {
        err ? console.error(err) : console.table(res);
        // if (err) throw err;
        // console.table(res);
        start(); // Prompt the user to choose an action again
      });
    });
}

// BONUS function to view total utilized budget by department
function viewDepartmentBudget() {
  inquirer
    .prompt({
      type: 'list',
      name: 'department',
      message: 'Select a department to view the total utilized budget:',
      choices: ['HR', 'Data Science', 'Admin', 'Sales & Marketing', 'Finance'],
    })
    .then((answer) => {
      const department = answer.department;
      const query = `
        SELECT d.name AS department, SUM(r.salary) AS utilized_budget
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        INNER JOIN department d ON r.department_id = d.id
        WHERE d.name = ?
        GROUP BY d.name
      `;
      connection.query(query, [department], (err, res) => {
        err ? console.error(err) : console.table(res);
        // if (err) throw err;
        // console.table(res);
        start(); 
      });
    });
}



