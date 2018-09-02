// Brind in modules
const express = require("express");
const router = express.Router();

// Bring in the database connection
const connection = require("../relational/database");

// Students page
router.get("/", (req, res) => {
  connection.query("SELECT * FROM Students", (err, results) => {
    if (err) throw err;
    res.render("students", {
      students: results
    });
  });
});

// Students form
router.get("/create", (req, res) => {
  res.render("student-form");
});

// Students form
router.post("/create", (req, res) => {
  // Init the student
  let student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    address: req.body.address,
    dateOfBirth: req.body.dateofbirth,
    password: "12345",
    phone: req.body.phone
  };

  // Run the query
  connection.query("INSERT INTO Students SET ?", student, (error, results) => {
    if (error) throw error;
    console.log(results.insertId);
    res.send("Student Added");
  });
});

// export the router module
module.exports = router;
