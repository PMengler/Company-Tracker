const db = require('./connect');
const inquirer = require('inquirer');
require('console.table');
require('dotenv').config();

// Query database to source schema and seed db
db.query('SOURCE db/schema.sql;', function (err, results) {
    if (err) throw (err)
    console.table(results);
    console.log('Database has been created.')
  });
  
  db.query('SOURCE db/seeds.sql;', function (err, results) {
    if (err) throw (err)
    console.table(results)
    console.log('Seeds have been planted in database.')
  });

function viewEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) throw err;
        console.table(results);
    })
};

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee\'s first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'rawlist',
            name: 'role',
            message: 'What is the employee\'s role?',
            choices: ['CEO','Manager','Human Resources','IT Technician','Developer']
        },
        {
            type: 'rawlist',
            name: 'department',
            message: 'To what department does this employee belong?',
            choices: ['Administration','Human Resources','Research and Development','Information Technology']
        }
    ])
    .then(answers => {
        db.query(`INSERT INTO employees (${answers.first_name}, ${answers.last_name}, ${answers.role}, ${answers.department})`, function (err, res) {
            if (err) throw err;
            console.table(res);
        })
        viewEmployees();
    })
};

function updateEmployeeRole() {
    db.query('SELECT * FROM employees', function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'What is the ID of the employee would you like to update?'
            },
            {
                type: 'rawlist',
                name: 'newRole',
                message: 'What is the employee\'s new role?',
                choices: ['CEO','Manager','Human Resources','IT Technician','Developer']
            }
        ])
        .then(answers => {
            db.query(`UPDATE employees SET role = ${answers.newRole} WHERE id = ${answers.employeeId}`, function (err, results) {
                if (err) throw err;
                console.table(results);
            })
        })
        viewEmployees();
    })
};

function viewRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        if (err) throw err;
        console.table(results);
    })
};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name:'salary',
            message: 'What is the salary of the role?'
        }
    ])
    .then(answers => {
        db.query(`INSERT INTO roles (${answers.title}, ${answers.salary})`, function (err, results) {
            if (err) throw err;
            console.table(results);
        })
        viewRoles();
    })
};

function viewDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) throw err;
        console.table(results);
    })
};

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'What is the name of the department?'
        }
    ])
    .then(answers => {
        db.query(`INSERT INTO departments (${answers.name})`, function (err, res) {
            if (err) throw err;
            console.table(res);
        })
        viewDepartments();
    })
};

module.exports = { viewEmployees, addEmployee, updateEmployeeRole, 
                   viewRoles, addRole, 
                   viewDepartments, addDepartment };