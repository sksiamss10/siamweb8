const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const conn = require("./conn");
app.use(bodyparser.urlencoded({ extended: true })); 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/form.html");
});
app.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    if (username === "") {
        res.write("Please filled the input box");
        res.end();
    } else if (password === "") {
        res.write("Please filled the input box");
        res.end();
    } else {
        res.write(`<h3 style='font-family:sans-serif;display:inline'>Your name is <h2 style='display:inline;font-family:sans-serif;'> ${username} </h2> <h3 style='display:inline;font-family:sans-serif;'>and password is</h3> <h2 style='display:inline;font-family:sans-serif;'> ${password} </h2>.</h3>`);
        conn.connect((err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("Connection success");
            }
            let sql = "INSERT INTO `form_data`(`Name`, `Password`) VALUES (?)";
            let values = [[`${username}`, `${password}`]];
            conn.query(sql,values, function (err, result) {
                if (err) {
                    res.end("<h2 style='color:red;font-family:arial;'>Data insert unsuccessful.</h2>");
                };
                res.end("<h2 style='color:green;font-family:arial;'>Data insert successful.</h2>");
            });
        });
    }
});
app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});
app.listen(process.env.PORT || 3000);