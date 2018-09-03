// Brind in modules
const express = require("express");
const router = express.Router();

// Employee model
const Employee = require("../models/Employee");

// Bring in the database connection
const connection = require("../relational/database");

// Employee page
router.get("/", (req, res) => {
  connection.query("SELECT * FROM Employees", (err, results) => {
    if (err) throw err;
    res.render("employees", {
      employees: results
    });
  });
});

// Employee form
router.get("/new", (req, res) => {
  res.render("employee-form", {
    actionOnSubmit: "create"
  });
});

// Employee form
router.post("/create", (req, res) => {
  // Init the employee
  const employee = new Employee(
    req.body.firstName,
    req.body.lastName,
    req.body.gender,
    req.body.phone,
    req.body.dateofbirth,
    req.body.address,
    "12345", // default value -- todo --> should generate a password
    "Non-Academic",
    req.body.nic,
    req.body.post
  );

  console.log(employee);

  // Validate the model
  const validationErrors = employee.validate().error;

  if (validationErrors) {
    res.render("employee-form", {
      error: validationErrors.details[0].message
    });
  } else {
    connection.query(
      "INSERT INTO Employees SET ?",
      employee,
      (error, results) => {
        if (error) throw error;
        console.log(results.insertId);
        res.redirect("/employees");
      }
    );
  }
});

// Single employee profile
router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM Employees WHERE Id = ?",
    req.params.id,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.render("employee-profile", {
        employee: result[0]
      });
    }
  );
});

// Edit employee form
router.get("/edit/:id", (req, res) => {
  connection.query(
    "SELECT * FROM Employees WHERE Id = ?",
    req.params.id,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.render("employee-form", {
        employee: result[0],
        actionOnSubmit: "update/" + req.params.id
      });
    }
  );
});

// Update student
router.post("/update/:id", (req, res) => {
  // Init the employee
  const employee = new Employee(
    req.body.firstName,
    req.body.lastName,
    req.body.gender,
    req.body.phone,
    req.body.dateofbirth,
    req.body.address,
    "12345", // default value -- todo --> should generate a password
    "Non-Academic",
    req.body.nic,
    req.body.post
  );

  console.log(employee);

  // Validate the model
  const validationErrors = employee.validate().error;

  if (validationErrors) {
    res.render("employee-form", {
      error: validationErrors.details[0].message
    });
  } else {
    connection.query(
      "UPDATE Employees SET FirstName=?, LastName=?, Gender=?, Phone=?, DateOfBirth=?, Address=?, Nic=?, Post=? WHERE Id=?",
      [
        employee.firstName,
        employee.lastName,
        employee.gender,
        employee.phone,
        employee.dateOfBirth,
        employee.address,
        employee.nic,
        employee.post,
        req.params.id
      ],
      (error, results) => {
        if (error) throw error;
        console.log(results.insertId);
        res.redirect("/employees");
      }
    );
  }
});

// export the router module
module.exports = router;
