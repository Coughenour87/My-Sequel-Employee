const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",

    port:3306,

    user:"root",

    password:"Daphne93!",
    database: "employees_DB"
});

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