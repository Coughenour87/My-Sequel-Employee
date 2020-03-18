const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user:"root",
    password:"Daphne93!",
    database: "employees_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
                "View Employees",
                "View Departments",
                "View Roles",
                "Add Employee",
                "Add Department",
                "Add Roles",
                "Update Roles",
                "Exit",
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "View Departments":
            viewDepartments();
            break;

        case "View Roles":
            viewRoles();
            break;

         case "View Employees":
            viewEmployees();
            break;

        case "Add Employee":
            addEmployee();
            break;

        case "Add Department":
            addDepartment();
            break;

        case "Add Roles":
            addRoles();
            break;

        case "Update Roles":
            updateRoles();
            break;

        case "Exit":
            exit();
            break;
        }
    });
}

function viewDepartments() {
    console.warn('this is departments')
    connection.query("SELECT department.id, department.department_name, SUM(roles.salary) As utilized_budget FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id= department.id GROUP BY department.id, department.department_name;", function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })
};

function viewRoles() {
    connection.query("SELECT roles.id, roles.title, department.department_name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id;", function(err, res) {
    if (err) throw err;
       console.table(res);
       runSearch();
   })
};

function viewEmployees() {
    console.log('hello is it me ')
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name, roles.salary, CONCAT(m.first_name, ', ', m.last_name) AS Manager FROM employee LEFT JOIN roles ON employee.role_id=roles.id LEFT JOIN department ON roles.department_id=department.id LEFT JOIN employee m ON employee.manager_id=m.id", function(err, res) {
        if (res) console.log(res, 'this is res ')
        if (err) throw err;
        console.table(res);
        runSearch();
    })
};

 function addEmployee() {
    connection.query("SELECT id, first_name, last_name FROM employee", function(err, managerResults) {
        if(err) throw err
        connection.query("SELECT id, title FROM roles", function(err, showRoles) {
            if (err) throw err;
            
     inquirer.prompt([
         {
             name: "firstName",
             type: "input",
             message: "Employees first name?",
         },
         {
            name: "lastName",
            type: "input",
            message: "Employees last name?",
         },
         {
            name: "roles",
            type: "list",
            choices: showRoles.map(rolesItem => ({ name: rolesItem.title, value: rolesItem.id })),
            message: "Employees roles?",
         },
         {
            name: "manager",
            type: "list",
            choices: managerResults.map(managerItem => ({name: `${managerItem.first_name} ${managerItem.last_name}`, value: managerItem.id})),
            message: "Employees manager?",
         }
     ])
     .then(function (answer) {
        // for ( i = 0; i < roles.length; i++) {
        //     if (roles[i].title === answer.role) {
        //         answer.role_id = roles[i].id
        //     }
        // }

         connection.query (
             "INSERT INTO employee SET ?",
            {
                 first_name: answer.firstName, 
                 last_name: answer.lastName, 
                 role_id: answer.roles, 
                 manager_id: answer.manager,
            },
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Employee added!\n");
                 runSearch();
            }
         )
     });
    });
 });
};

function addDepartment() {
    inquirer
    .prompt ([
        {
            name: "newDepartment",
            type: "input",
            message: "New departments name?"
        }
    ]).then(function(answer) {
        console.log(answer.newDepartment)
        connection.query(
            "INSERT INTO department SET ?",
            {
                department_name:answer.newDepartment
            }, 
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Department added!\n");
                runSearch();
            }
        );
    });
};

function addRoles() {
    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err;
    inquirer
    .prompt([
        {
            name: "title",
            type: "input",
            message: "Name of employees new roles?",
        },
        {
            name: "salary",
            type: "input",
            message: "What is the new roles salary?",
        },
        {
            name: "department",
            type: "list",
            choices: results.map(department => ({name: department.department_name, value: department.id})),
            message: "New departments name?",
        }
    ])
    .then(function(answer) {

        connection.query (
            "INSERT INTO roles SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department
            }, 
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Roles added!\n");
                runSearch();
            }
        )
    });
});
};

function updateRoles() {
    connection.query("SELECT id, first_name, last_name FROM employee", function(err, employeeResults) {
        connection.query("SELECT id, title FROM roles", function(err, rolesResults) {
            if (err) throw err;
    inquirer
    .prompt([
        {
            name: "employeeName",
            type: "list",
            choices: employeeResults.map(employee => ({name: `${employee.first_name} ${employee.last_name}`, value: employee.id})),
            message: "Which employees role is being updated?",
        },
        {
            name: "roles",
            type: "list",
            choices: rolesResults.map(roles => ({name: roles.title, value: roles.id})),
            message: "What is the employees new role?",
        },
    ])
    .then(function(answer) {
        var query = connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
                {
                    role_id:answer.roles
                },
                {
                    id:answer.employeeName
                }
            ],
            function (err, res) {
                if (err) throw err;
                console.log(res.affectedRows + " Employee updated!\n");
                runSearch();

                 }
             )
         });
    });
});
};

function exit() {
console.log("logging off ...");
connection.end();
};
