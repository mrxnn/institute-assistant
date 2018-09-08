const express = require('express');
const router = express.Router();
const db = require('../relational/database');
const Student = require('../models/Student');

/**
 * GET
 * http://localhost:3000/students
 */
router.get('/', (req, res) => {
  db.query('SELECT * FROM Students', (err, results) => {
    res.render('students', {
      students: results
    });
  });
});

/**
 * GET
 * http://localhost:3000/students/add
 */
router.get('/add', (req, res) => {
  res.render('student-add-form');
});

/**
 * GET
 * http://localhost:3000/students/1
 */
router.get('/:id', (req, res) => {
  db.query(
    'SELECT * FROM Students WHERE Id = ?',
    req.params.id,
    (err, results) => {
      if (err) throw err;
      res.render('student-profile', {
        student: results[0]
      });
    }
  );
});

/**
 * POST
 * http://localhost:3000/students/add
 */
router.post('/add', (req, res) => {
  // Init the student
  let student = new Student(
    req.body.firstName,
    req.body.lastName,
    req.body.gender,
    req.body.nic,
    req.body.dateOfBirth,
    req.body.phone,
    req.body.email,
    req.body.location,
    req.body.bio
  );

  db.query('INSERT INTO Students SET ?', student, (err, result) => {
    if (err) throw err;
    res.status(201).redirect('/students');
  });
});

/**
 * GET
 * http://localhost:3000/students/edit/1
 */
router.get('/edit/:id', (req, res) => {
  db.query(
    'SELECT * FROM Students WHERE Id = ?',
    req.params.id,
    (err, results) => {
      if (err) throw err;
      res.render('student-edit-form', {
        student: results[0]
      });
    }
  );
});

/**
 * POST
 * http://localhost:3000/students/edit
 */
router.post('/edit', (req, res) => {
  db.query('UPDATE Students SET firstName=?, lastName=?, gender=?, nic=?, dateOfBirth=?, phone=?, email=?, location=?, bio=? WHERE id=?',
  [
    req.body.firstName,
    req.body.lastName,
    req.body.gender,
    req.body.nic,
    req.body.dateOfBirth,
    req.body.phone,
    req.body.email,
    req.body.location,
    req.body.bio,
    req.body.id
  ], (err, results) => {
    if (err)
      throw err;
    res.redirect('/students');
  });
});

/**
 * DELETE
 * http://localhost:3000/students/delete/1
 */
router.delete('/delete/:id', (req, res) => {
  db.query(
    'DELETE FROM Students WHERE Id = ?',
    req.params.id,
    (err, results) => {
      if (err) throw err;
      res.status(200).json({ message: 'Student deleted' });
    }
  );
});

// Export the router
module.exports = router;