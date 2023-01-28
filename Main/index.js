const inquirer = require('inquirer');
const db = require('./db/funcJS');
require('console.table');

const questions = [
  {
    type: 'rawlist',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View Employees',
      'Add an employee',
      'Update an employee role',
      'View all roles in company',
      'Add a role',
      'View all departments',
      'Add a department',
      'Quit',
    ],
  },
];

function init() {
  //   db.query('SOURCE db/schema.sql;', function (err, results) {
  //     if (err) throw err;
  //     console.table(results);
  //     console.log('Database has been created.');
  //   });

  //   db.query('SOURCE db/seeds.sql;', function (err, results) {
  //     if (err) throw err;
  //     console.table(results);
  //     console.log('Seeds have been planted in database.');
  //   });

  inquirer.prompt(questions).then((chosenAction) => {
    switch (chosenAction.action) {
      // this works
      case 'View Employees':
        db.viewEmployees();
        init();
        break;
      case 'Add an employee':
        db.addEmployee();
        db.viewEmployees();
        // init();
        break;
      case 'Update an employee role':
        db.updateEmployeeRole();
        db.viewEmployees();
        // init();
        break;
      // this works
      case 'View all roles in company':
        db.viewRoles();
        init();
        break;
      case 'Add a role':
        db.addRole();
        db.viewRoles();
        // init();
        break;
      // this works
      case 'View all departments':
        db.viewDepartments();
        init();
        break;
      case 'Add a department':
        db.addDepartment();
        db.viewDepartments();
        // init();
        break;
      // this works
      case 'Quit':
        db.quit();
        break;
    }
  });
}

init();
