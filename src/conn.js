const mysql = require("mysql");
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    pass: "",
    database: "hello_data"
});
module.exports = conn;