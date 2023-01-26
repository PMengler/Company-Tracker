const inquirer = require('inquirer');
// const cTable = require('console.table');
const funcJS = require('./db/funcJS');

const questions = [
    {
        type: 'rawlist',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View Employees', 
                  'Add an employee', 
                  'Update an employee role', 
                  'View all roles in company',
                  'Add a role',
                  'View all departments',
                  'Add a department',
                  'Quit']
    }
]

function init() {
    inquirer.prompt(questions).then(chosenAction => {
        switch (chosenAction.action) {
            case 'View Employees':
                funcJS.viewEmployees();
                init();
                break;
            case 'Add an employee':
                funcJS.addEmployee();
                init();
                break;
            case 'Update an employee role':
                funcJS.updateEmployeeRole();
                init();
                break;
            case 'View all roles in company':
                funcJS.viewRoles();
                init();
                break;
            case 'Add a role':
                funcJS.addRole();
                init();
                break;
            case 'View all departments':
                funcJS.viewDepartments();
                init();
                break;
            case 'Add a department':
                funcJS.addDepartment();
                init();
                break;
            case 'Quit':
                funcJS.db.query('QUIT')
        }
        
    })
}

// init();