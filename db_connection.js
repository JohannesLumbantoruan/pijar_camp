const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pijarcamp"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Database connected!");
});

module.exports = connection;