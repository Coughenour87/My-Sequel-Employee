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
    return;
});

connection.query("SELECT * from department", function (error, res) {
    showdepartment = res.map(department => ({ name: department.name, value: department.id }))
});

connection.query("SELECT * from roles", function (error, res) {
    showroles = res.map(roles => ({ name: roles.title, value: roles.id }))
});

connection.query("SELECT * from employee", function (error, res) {
    showemployee = res.map(employee => ({ name: employee.first_name, value: employee.id }))
});

showlist();


function showlist() {
    inquirer
    .prompt(
    {
        type: "list",
        message: "What would you like to do?",
        name:"choices",
        choices: [
            {
                name:"View employees",
                value: "viewEmployees"
            },
            {
                name: "View departments",
                value: "viewDepartments"
            },
            {
                name: "View roles",
                value: "viewRoles"
            },
            {
                name: "Add empolyee",
                value: "addEmployee"
            },
            {
                name: "Add department",
                value: "addDeparment"
            },
            {
                name: "Add roles",
                value: "addRoles"
            },
            {
                name: "Update roles",
                value: "newRoles",
            },
        ]
    })
    .then(function(res) {
        list(res.choices)
    });
}

function list(options) {
    switch(options) {
        case "viewEmployees":
            viewEmployees();
            break;
        case "viewDepartments":
            viewDepartments();
            break;
        case "viewRoles":
            viewRoles();
            break;
        case "addEmployee":
            addEmployee();
            break;
        case "addDepartment":
            addDepartment();
            break;
        case "addRoles":
            addRoles();
            break;
        case "newRoles":
            newRoles();
    }
};
 function viewDepartments() {
     connection.query("SELECT * from department", function (err, res) {
         console.table(res);
         menu();
     });
 };

 function viewRoles() {
     connection.query("SELECT * from roles", function (err, res) {
         console.table(res);
         menu();
     });
 };

 function addEmployee() {
     inquirer
     .prompt([
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
            message: "Employees role?",
            name: "roles",
            choices: showroles
         },
         {
            type: "list",
            message: "Employees manager?",
            name: "manager",
            choice: showemployee,
         },
     ]).then(function (response) {
         addEmployee(response)
     });
 };
 

