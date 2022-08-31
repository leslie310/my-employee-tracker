const mysql = require('mysql2')
const inquirer= require('inquirer');
const cTable = require('console.table');


const db = mysql.createConnection(
    {

    host: 'localhost',
      user: 'root',
      password: 'Ivan001!',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)

)


const init = () => {
    inquirer.prompt([
        {
            name: "start",
            message: "Welcome! Press Enter to begin.",
            type: "input",
        },
        {
            name: "task",
            message: "What would you like to do?",
            type: "list",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Quit"]
        }
    ]).then(ans =>  {
        if (ans.task==='View all employees'){
            viewEmployee();
        } else if (ans.task==='View all departments'){
            viewDepartments();
        } else if (ans.task=== 'View all roles'){
            viewRoles();
        } else if (ans.task==='Add an employee'){
            addEmployee();
        } else if (ans.task==='Add a department'){
            addDepartment();
        } else if (ans.task=== 'Add a role'){
            addRole();
        } else {
            quitApp();
        }
                
        
    })
};
const viewEmployee = () => {
    db.query('SELECT * FROM employees, first_name, last_name, manager_id, roles.title, roles.salary', (err,results)=>{
        if (err) throw err;
        console.table('\n', results);
    })
    init();
   
}


const viewDepartments = () => {
    db.query('SELECT * FROM department',(err, results) =>{
        if (err) throw err;
        console.table('\n', results);
      
    })
    console.log('Press Enter to return to the task list');
    init();
};
const viewRoles = () => {
    db.query('SELECT * FROM employee_role', (err, results) =>{
        if (err) throw err;
        console.table('\n', results);
        init();
    })
};
const addEmployee = () => {
    db.query('SELECT * FROM employee_role', (err, results) =>{
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
                name:'manager_id',
                type:'number',
                message:'What is the manager id?'
            },
            {
                name:'role_id',
                message:'what is their role?',
                type:'list',
                choices: results,
            }
        ]).then(ans=> {
            console.log(ans);
           
            db.query('INSERT INTO employees(first_name,last_name,manager_id,role_id)VALUES(?,?,?,?)', [ans.first_name, ans.last_name, ans.manager_id, ans.role_id], (err,results)=>{
                if(err)
                throw err
            console.table('\n', results);
        })
        init();
    })
})

 

};

const addDepartment = () => {
    inquirer.prompt([
            {
                name: 'addDepartment', 
                type: 'input', 
                message: 'Which department would you like to add?'
            }
        ]).then(ans=>{
            db.query('INSERT INTO department(name) VALUES(?)', [ans.name], (err,results)=>{
                if(err)
                    throw err
                db.query('SELECT * FROM department', (err,results)=>{
                    if(err)
                        throw err
                    console.table('\n', results);
                })
            })
            init();
        })
    }
const addRole = () => {
    db.query('SELECT * FROM department', (err, res) => {
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
                type: 'number',
                message: 'What is the salary of this role? (Enter a number)'
            },
            {
                name: 'department_id',
                message: 'What department is this role in?',
                type: 'list',
                choices: results,
            }   
        ]).then(ans=>{
            console.log(ans);
            db.query('INSERT INTO roles(title, salary, department_id) VALUES(?,?,?)', [ans.title, ans.salary, ans.department_id], (err,results)=>{
                if(err)
                    throw err
                db.query('SELECT * FROM roles', (err,results)=>{
                    if(err)
                        throw err
                    console.table('\n', results);
                })
                init();
        })
    })
})

}


init();