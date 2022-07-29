const mysql = require('mysql2')
const inquirer= require('inquirer');
const consoleTable = require('console.table');


const db = mysql.createConnection(
    {

    host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Ivan001!',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)

);


function options(){
    inquirer.prompt({

        name:'action',
        type:'list',
        message:'Welcome to our employee database, what would you like to do?',
        choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                'Add an employee',
                'Add a department',
                'Add a role',
        ]
    }).then(function (answer) {
        switch (answer.action) {
            case 'View all employees':
                viewEmployees();
                break;
            case 'View all departments':
                viewDepartment();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
        }
    })
};
function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) throw err;
        console.log(res.length + 'employees found!');
        console.table('All Employees:', results);
        options();
    })
};
function viewDepartment() {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw err;
        console.table('All departments:', results);
        options();
    })
};
function viewRoles() {
    db.query('SELECT * FROM employee_role', function (err, results) {
        if (err) throw err;
        console.table('All roles:', res);
        options();
    })
};
function addEmployee() {
    db.query('SELECT * FROM employee_role', function (err, results) {
        if (err) throw err;
        inquirer.prompt([
            {
                name:'first name',
                type:'Input',
                message:'What is the employee first name?'
            },
            {
                name:'last name',
                type:'Input',
                message:'What is the employee last name?'
            },
            {
                name:'ID',
                type:'Input',
                message:'What is the employee id?'
            },
            {
                name:'role',
                type:'list',
                choices: function() {
                    var roleArray = [];
                    for (let i= 0; i < res.length; i++) {
                        roleArray.push(res[i].title);
                    }
                    return roleArray;
                },
                message:'What is the role?'
            }
        ]).then(function (answer) {
            let role_id;
            for (let a=0; a < res.length; a++) {
                if (res[a].title == answer.role) {
                    role_id = res[a].id;
                    console.log(role_id)
                }                  
            } 
db.query(
     'INSERT INTO employee SET ?',
    {
    first_name: answer.first_name,
    last_name: answer.last_name,
     manager_id: answer.manager_id,
    role_id: role_id,
 },
function (err) {
    if (err) throw err;
    console.log('Your employee has been added!');
    options();
            })
        })
})
};

function addDepartment() {
    inquirer.prompt([
            {
                name: 'addDepartment', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO department SET ?',
                    {
                        name: answer.newDepartment
                    });
db.query('SELECT * FROM employee_role', function (err, res) {
        if (err) throw err;
        console.log('department has been added!');
        console.table('All Departments:', res);
        options();
        })
    })
};

function addRole() {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
    
        inquirer 
        .prompt([
            {
                name: 'new_role',
                type: 'input', 
                message: "What new role would you like to add?"
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                    deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ]).then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
    
             db.query(`INSERT INTO role (title, salary, department_id)
             VALUES ("${answer.roleTitle}", ${answer.salary}, ${deptID})`, (err, res) => {
                    if(err)throw err;
                    console.log('Your new role has been added!');
                    console.table('All Roles:', res);
                    options();
                })
            })
    })
}
options();