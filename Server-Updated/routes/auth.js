const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const db = require('../relational/database');

// Display the login page
router.get('/login', (req, res) => {
  res.render('login', { layout: false });
})

// Login
router.post('/login', (req, res) => {
  // get the properties
  let userId = req.body.userid;
  let password = req.body.password;
  let type = req.body.usertype;

  // Student Login
  if (type === 'Student') 
  {
    db.query('SELECT * FROM Students WHERE id=?', userId, (err, results) => {
      if (err) throw err;
      if (!results[0]) {
        req.flash('error', 'Login Failed, No user found')
        res.redirect('/auth/login');
      } else {
        if (bcrypt.compareSync(password, results[0].password)) {
          res.redirect('/dashboard');
        } else {
          req.flash('error', 'Login Failed, Invalid Credentials')
          res.redirect('/auth/login');
        }
      }
    });
  } 
  // Employee Login
  else if (type === 'Employee') 
  {
    db.query('SELECT * FROM Employees WHERE id=?', userId, (err, results) => {
      if (err) throw err;
      if (!results[0]) {
        req.flash('error', 'Login Failed, No user found')
        res.redirect('/auth/login');
      } else {
        console.log(results[0].password);
        if (bcrypt.compareSync(password, results[0].password)) {
          res.redirect('/dashboard');
        } else {
          req.flash('error', 'Login Failed, Invalid Credentials')
          res.redirect('/auth/login');
        }
      }
    });
  }
  // Unknown Login
  else 
  {
    req.flash('error', 'Please select the User Type')
    res.redirect('/auth/login');
  }
});

// Export the router
module.exports = router;