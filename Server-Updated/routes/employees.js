const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const db = require('../relational/database');

/**
 * GET
 * http://localhost:3000/employees
 */
router.get('/', (req, res) => {
  db.query('SELECT * FROM Employees', (err, results) => {
    if (err) throw err;
    res.render('employees', {
      employees: results
    })
  });
});

/**
 * GET
 * http://localhost:3000/employees/add
 */
router.get('/add', (req, res) => {
  res.render('employee-add-form');
});

/**
 * POST
 * http://localhost:3000/employees/add
 */
router.post('/add', (req, res) => {
  // init the employee object
  const employee = new Employee(
    req.body.firstName,
    req.body.lastName,
    req.body.gender,
    req.body.nic,
    req.body.dateOfBirth,
    req.body.phone,
    req.body.email,
    req.body.location,
    req.body.bio,
    req.body.type,
    req.body.post
  );

  // validate the properties
  const error = employee.validate().error;
  if (error !== null) {
    req.flash('error', error.details[0].message);
    res.redirect('/employees/add');
    return;
  }

  // add the employee to db
  db.query('INSERT INTO Employees SET ?', employee, (err, results) => {
    if (err) throw err;
    req.flash('success', 'Employee is successfully added');
    res.status(201).redirect('/employees');
  });
});

/**
 * GET
 * http://localhost:3000/employees/1
 */
router.get('/:id', (req, res) => {
  db.query(
    'SELECT * FROM Employees WHERE Id = ?',
    req.params.id,
    (err, results) => {
      if (err) throw err;
      res.render('employee-profile', {
        employee: results[0]
      });
    }
  );
});

// export the router
module.exports = router;