// Brind in modules
const express = require("express");
const router = express.Router();

// Student model
const Student = require("../models/Student");

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
  const student = new Student(
    req.body.firstName,
    req.body.lastName,
    req.body.gender,
    req.body.phone,
    req.body.dateofbirth,
    req.body.address,
    "12345" // default value -- todo --> should generate a password
  );

  // Validate the properties
  if (student.validate()) {
    connection.query(
      "INSERT INTO Students SET ?",
      student,
      (error, results) => {
        if (error) throw error;
        console.log(results.insertId);
        res.redirect("/students");
      }
    );
  } else {
    // Log the error
  }
});

// export the router module
module.exports = router;
