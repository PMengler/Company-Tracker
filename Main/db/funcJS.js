const connection = require('./connect');
const inquirer = require('inquirer');
require('console.table');

class Employee {
  constructor(first_name, last_name, role, department) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.role = role;
    this.department = department;
  }
}

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  viewEmployees() {
    this.connection.query('SELECT * FROM employees', function (err, results) {
      if (err) throw err;
      console.log('\n');
      console.table(results);
    });
  }

  // need to figure out how to continue with the prompts
  addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: "What is the employee's first name?",
        },
        {
          type: 'input',
          name: 'last_name',
          message: "What is the employee's last name?",
        },
        {
          type: 'rawlist',
          name: 'role_id',
          message: "What is the employee's role ID?",
          choices: ['1', '2', '3', '4', '5'],
        },
        {
          type: 'rawlist',
          name: 'manager_id',
          message: 'What is the manager ID of the new employee?',
          choices: ['10', '11', '12', '13', '14'],
        },
      ])
      .then((answers) => {
        const sqlString = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}', '${answers.last_name}', ${answers.role_id}, ${answers.manager_id});`;
        console.log(sqlString);
        this.connection.query(sqlString, function (err, results) {
          if (err) throw err;
          console.log('\n');
          console.table(results);
        });
      });
    return;
  }

  updateEmployeeRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'employeeId',
          message: 'What is the ID of the employee would you like to update?',
        },
        {
          type: 'rawlist',
          name: 'newRole',
          message: "What is the employee's new role?",
          choices: ['1', '2', '3', '4', '5'],
        },
      ])
      .then((answers) => {
        this.connection.query(
          `UPDATE employees SET role_id = ${answers.newRole} WHERE employee_id = ${answers.employeeId}`,
          function (err, results) {
            if (err) throw err;
            console.log('\n');
            console.table(results);
          }
        );
      });
    // viewEmployees();
  }

  viewRoles() {
    return this.connection.query(
      'SELECT * FROM roles',
      function (err, results) {
        if (err) throw err;
        console.log('\n');
        console.table(results);
      }
    );
  }

  addRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of the role?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary of the role?',
        },
        {
          type: 'rawList',
          name: 'department_id',
          message: 'What is the department ID of the role?',
        },
      ])
      .then((answers) => {
        this.connection.query(
          `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.title}', ${answers.salary}, ${answers.department_id})`,
          function (err, results) {
            if (err) throw err;
            console.log('\n');
            console.table(results);
          }
        );
      });
    // viewRoles();
  }

  viewDepartments() {
    return this.connection.query(
      'SELECT * FROM departments',
      function (err, results) {
        if (err) throw err;
        console.log('\n');
        console.table(results);
      }
    );
  }

  addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'departmentName',
          message: 'What is the name of the department?',
        },
      ])
      .then((answers) => {
        this.connection.query(
          `INSERT INTO departments (department_name) VALUES ('${answers.departmentName}')`,
          function (err, results) {
            if (err) throw err;
            console.log('\n');
            console.table(results);
          }
        );
      });
    // viewDepartments();
  }

  quit() {
    console.log('\n');
    console.log('Goodbye!');
    console.log('\n');
    connection.end();
  }
}

module.exports = new DB(connection);
