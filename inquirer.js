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

// connection.query("SELECT * from department", function (err, res) {
//     showdepartment = res.map(department => ({ name: department.name, value: department.id }))
// });

// connection.query("SELECT * from roles", function (err, res) {
//     showroles = res.map(roles => ({ name: roles.title, value: roles.id }))
// });

// connection.query("SELECT * from employee", function (err, res) {
//     showemployee = res.map(employee => ({ name: employee.first_name, value: employee.id }))
// });

// showlist();


function runSearch() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            {
                name:"View employees",
                // value: "viewEmployees"
            },
            {
                name: "View departments",
                // value: "viewDepartments"
            },
            {
                name: "View roles",
                // value: "viewRoles"
            },
            {
                name: "Add empolyee",
                // value: "addEmployee"
            },
            {
                name: "Add department",
                // value: "addDeparment"
            },
            {
                name: "Add roles",
                // value: "addRoles"
            },
            {
                name: "Update roles",
                // value: "newRoles",
            },
            {
                name: "exit",
            },
        ]
    })
    .then(function(answer) {
        switch (answer.choices) {
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
        case "updateRoles":
            updateRoles();
        }
    });
}

function viewEmployees() {
    inquirer
    .prompt({
        name: "employee",
        type: "input",
        message: "Which employee would you like to view?"
    })
    .then(function(answer) {
        var query = "SELECT position, first_name, last_name, FROM employee WHERE ?";
        connection.query(query, [{firstname: answer.firstname, lastname: answer.lastname}],function(err, res) {
            if (err) throw err;
            console.table(res)
            runSearch();
        });
    });
}

 function viewDepartments() {
     inquirer
     .prompt ({
         name:"department",
         type: "input",
         message: "Which department would you like to view?"
     })
     .then(function(answer) {
         var query = "SELECT position, department_name FROM department WHERE ?";
         connection.query(query,{department:answer.departmentname}, function (err, res) {
             if (err) throw err;
             console.table(res);
             runSearch();
         });
     });
 }

 function viewRoles() {
     inquirer
     .prompt ({
         name:"roles",
         type: "input",
         message: "Which roles would you like to view?"
     })
     .then(function(answer) {
         var query = "SELECT position, title FROM roles WHERE ?";
         connection.query(query,{roles:answer.title}, function (err, res) {
             if (err) throw err;
             console.table(res);
             runSearch();
         });
     });
 }

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
     .then(function (answer) {
         var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id)";
         connection.query (query, {employee:answer.first_name, employee:answer.last_name, employee:answer.role_id, employee:answer.manager_id },
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
            message: "Name of employees new role?",
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
end();  
