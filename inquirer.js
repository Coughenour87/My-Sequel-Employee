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
    })
}
array = [
    {
        firstname: "",
        lastname: "kovel",
        pet: "Jango"
    },
    {
        firstname: "lori",
        lastname: "kovel",
        pet: "Jiggs"
    }
];
  function myFunction() {
    const fullname = array.map(person => `${person.firstname} ${person.lastname}`);
    console.table(fullname);
  }
  myFunction();