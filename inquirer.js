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

connection.query("SELECT * from department", function (err, res) {
    showdepartment = res.map(department => ({ name: department.name, value: department.id }))
});

connection.query("SELECT * from roles", function (err, res) {
    showroles = res.map(roles => ({ name: roles.title, value: roles.id }))
});

connection.query("SELECT * from employee", function (err, res) {
    showemployee = res.map(employee => ({ name: employee.first_name, value: employee.id }))
});

showlist();


function showlist() {
    inquirer.prompt(
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
     ])
     .then(function (response) {
         addEmployee(response)
         connection.query ("INSERT INTO employee (first_name, last_name, role_id, manager_id"),
         function (err, res) {
             if (err) throw error;
         };
     });
 };
    menu();


function addDeparment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Departments name?",
            name: "name"
        }
    ])
    .then(function(response) {
        addDeparment(response)
        connection.query("INSERT INTO department (name) VALUES"),
        function (err, res) {
            if (err) throw error;
        };
    });
};
    menu();


function addRoles() {
    inquirer.prompt([
        {
            type: "input",
            message: "Name of employees new role?",
            name: "title"
        },
        {
            type: "input",
            message: "What is the new roles salary?",
            name: "salary"
        },
        {
            type: "list",
            message: "New departments name?",
            name: "id",
            choices: showdepartment
        }
    ])
    .then(function(response){
        connection.query("INSERT INTO roles (title, salary, id"),
        function (err, res) {
        if (err) throw error;
        addRoles(response);
        };
    });
};
menu();

function newRoles() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which employees role is being updated?",
            name: "employeeid",
            choices: showemployee
        },
        {
            type: "list",
            message: "What is the employees new role?",
            name: "titleid",
            choices: showroles
        }
    ])
    .then(function(response) {
        updateRole(response);
        connection.query("UPDATE employee SET "),
        function (err, res) {
            if (err) throw error;
        };
    });
};
end();  
