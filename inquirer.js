const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user:"root",
    password:"Daphne93!",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
});

connection.query("SELECT * from department", function (err, res) {
    showdepartment = res.map(department => ({ name: department.name, value: department.id }))
});

connection.query("SELECT * from roles", function (err, res) {
    showroles = res.map(roles => ({ name: roles.title, value: roles.id }))
});

connection.query("SELECT * from employee", function (err, res) {
    showemployee = res.map(employee => ({ name: employee.first_name, value: employee.id }))
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
                "Add Empolyee",
                "Add Department",
                "Add Roles",
                "Update Roles",
                "exit",
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "View Employees":
            viewEmployees();
            break;
        case "View Departments":
            viewDepartments();
            break;
        case "View Roles":
            viewRoles();
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
        }
    });
}

function viewEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name, roles.salary FROM employee LEFT JOIN roles ON employee.role_id=roles.id LEFT JOIN department ON roles.department_id=department.id", function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })
};


function viewDepartments() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name, roles.salary FROM employee LEFT JOIN roles ON employee.role_id=roles.id LEFT JOIN department ON roles.department_id=department.id ORDER BY department_name", function(err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
    })
};


 function viewRoles() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name, roles.salary FROM employee LEFT JOIN roles ON employee.role_id=roles.id LEFT JOIN department ON roles.department_id=department.id ORDER BY roles.title", function(err, results) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(results);
        runSearch();
    })
};


 function addEmployee() {
     inquirer.prompt([
         {
             type: "input",
             message: "Employees first name?",
             name: "firstName",
         },
         {
            type: "input",
            message: "Employees last name?",
            name: "lastName",
         },
         {
            type: "list",
            message: "Employees roles?",
            name: "roles",
            choices: showroles
         },
         {
            type: "list",
            message: "Employees manager?",
            name: "manager",
            choice: showemployee,
         },
     ])
     .then(function (answer) {
         var query = "INSERT INTO employee (first_name, last_name, roles_id, manager_id)";
         connection.query (query, {employee:answer.first_name, employee:answer.last_name, employee:answer.roles_id, employee:answer.manager_id },
         function (err, res) {
             if (err) throw err;
             console.table(res);
             runSearch();
         });
     });
 }

function addDepartment() {
    inquirer
    .prompt ({
            name: "department",
            type: "input",
            message: "New departments name?"
    })
    .then(function(answer) {
        var query = "INSERT INTO department (name)";
        connection.query(query,{department:answer.department}, function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
    });
}

function addRoles() {
    inquirer.prompt([
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
            name: "department id",
            type: "list",
            message: "New departments name?",
            choices: showdepartment
        }
    ])
    .then(function(answer) {
        var query = "INSERT INTO roles title, salary, id";
        connection.query(query,{roles:answer.roles}, function (err, res) {
        if (err) throw err;
        console.table(res);
        runSearch();
        });
    });
}

function updateRoles() {
    inquirer
    .prompt([
        {
            name: "employeeid",
            type: "list",
            message: "Which employees role is being updated?",
            choices: showemployee
        },
        {
            name: "titleid",
            type: "list",
            message: "What is the employees new role?",
            choices: showroles
        }
    ])
    .then(function(answer) {
        var query = "UPDATE roles";
        connection.query(query,{roles:answer.roles},
        function (err, res) {
            if (err) throw err;
            console.table(res);
            runSearch();
        });
    });
};
// end();  
