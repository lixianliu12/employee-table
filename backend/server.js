const express = require("express");
const cors = require("cors");
const fs = require('fs');
const mysql = require("mysql");

const app = express();
app.use(express.json());

app.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"test"
})

const data = JSON.parse(fs.readFileSync('data.json')).employees;
data.forEach((item) => {
    const sql = "INSERT INTO employees (`Firstname`, `Lastname`, `Salary`) VALUES (?, ?, ?)";
    const values = [item.firstName, item.lastName, item.salary];

    db.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log("Data inserted successfully");
    });
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    })
})

app.post('/create', (req, res) => {
    const sql = "INSERT INTO employees (`Firstname`, `Lastname`, `Salary`) VALUES (?)";
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.salary
    ]
    db.query(sql, [values], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE employees SET `Firstname` = ?, `Lastname` = ?, `Salary` = ? WHERE ID = ?";
    const values = [
        req.body.firstname,
        req.body.lastname,
        req.body.salary
    ]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.delete('/employee/:id', (req, res) => {
    const sql = "DELETE FROM employees WHERE ID = ?";
    
    const id = req.params.id;

    db.query(sql, [id], (err, data) =>{
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.listen(8081, () =>{
    console.log("listening");
})