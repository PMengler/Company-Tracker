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
    return this.connection.execute(
      'SELECT * FROM employees',
      function (err, results) {
        if (err) throw err;
        console.log('\n');
        console.table(results);
      }
    );
  }

  // needs work, promise not working
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
          name: 'role',
          message: "What is the employee's role?",
          choices: [
            'CEO',
            'Manager',
            'Human Resources',
            'IT Technician',
            'Developer',
          ],
        },
        {
          type: 'rawlist',
          name: 'department',
          message: 'To what department does this employee belong?',
          choices: [
            'Administration',
            'Human Resources',
            'Research and Development',
            'Information Technology',
          ],
        },
      ])
      .then((answers) => {
        const employee = new Employee(
          answers.first_name,
          answers.last_name,
          answers.role,
          answers.department
        );

        return this.connection.query(
          `INSERT INTO employees ${employee}`,
          function (err, results) {
            if (err) throw err;
            console.log('\n');
            console.table(results);
          }
        );
      });
    // viewEmployees();
  }

  // this needs work
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
          choices: [
            'CEO',
            'Manager',
            'Human Resources',
            'IT Technician',
            'Developer',
          ],
        },
      ])
      .then((answers) => {
        connection.query(
          `UPDATE employees SET role = ${answers.newRole} WHERE id = ${answers.employeeId}`,
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

  // this needs work
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
      ])
      .then((answers) => {
        return this.connection.query(
          `INSERT INTO roles (${answers.title}, ${answers.salary})`,
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

  // this needs work
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
        return connection.query(
          `INSERT INTO departments ${answers.departmentName}`,
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
