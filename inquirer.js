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
    start();
});

function start() {
    inquirer
    .prompt({
        name: "viewEmployees",
        type: "list",
        message: "Would you like to [VIEW] employee names or [ROLES]",
        choices: ["VIEW", "ROLES", "EXIT"]
    })
    .then(function(answer) {
        if (answer.viewEmployees === "VIEW") {
            postEmployee();
        }
        else if(answer.viewEmployees === "ROLES") {
            postRoles();
        }else{
            connection.end();
        }
    });
}

function postEmployee() {
    inquirer
    .prompt([
        {
            name: "employee",
            type: "input",
            message:"What employee would you like to view?",
        },
        {
            name: "role",
            type: "input",
            message: "What is the employee role",
        },
    ])
    .then(function(answer) {
        connection.query(
            "INSERT INTO employee ?",
            {
                employee_name: answer.employee,
                role: answer.role,

            },
            function(err) {
                if (err) throw err;
                start();
            }
        );
    });
}
