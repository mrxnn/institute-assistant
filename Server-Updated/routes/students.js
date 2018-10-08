const bcrypt = require('bcryptjs');
const randomString = require('randomstring');
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

      // load the courses
      db.query(
        'SELECT c.title FROM Courses c, StudentCourses s WHERE s.courseid = c.id AND s.studentid = ?',
        req.params.id,
        (err, coursesResult) => {
          if (err) throw err;

          res.render('student-profile', {
            student: results[0],
            courses: coursesResult
          });
        }
      );
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

  // Validate the student
  const error = student.validate().error;
  if (error !== null) {
    req.flash('error', error.details[0].message);
    res.redirect('/students/add');
    return;
  }

  // Generate the default password
  let defaultPassword = randomString.generate({
    length: 12,
    charset: 'alphabetic'
  });

  // Hash the password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(defaultPassword, salt, (err, hash) => {
      if (err) throw err;

      // Set the hashed password
      student.setPassword(hash);

      // Add the student to db
      db.query('INSERT INTO Students SET ?', student, (err, result) => {
        if (err) throw err;

        // Add the course id
        db.query(
          'INSERT INTO StudentCourses SET ?',
          { studentid: result.insertId, courseid: 1 },
          (err, resultts) => {
            if (err) throw err;

            req.flash(
              'success',
              'Student is successfully added with the password = ' +
                defaultPassword
            );
            res.status(201).redirect('/students');
          }
        );
      });
    });
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
  db.query(
    'UPDATE Students SET firstName=?, lastName=?, gender=?, nic=?, dateOfBirth=?, phone=?, email=?, location=?, bio=? WHERE id=?',
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
    ],
    (err, results) => {
      if (err) throw err;
      req.flash('success', 'Student is successfully updated');
      res.redirect('/students');
    }
  );
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
      req.flash('success', 'Student is successfully removed');
      res.status(200).json({ message: 'Student deleted' });
    }
  );
});

/**
 * GET
 * http://localhost:3000/students/addcourse/
 */
router.get('/addcourse/:id', (req, res) => {
  res.render('assigncourseform', {
    studentid: req.params.id
  });
});

/**
 * POST
 * http://localhost:3000/students/addcourse/
 */
router.post('/addcourse', (req, res) => {
  db.query(
    'INSERT INTO StudentCourses SET ?',
    {
      studentid: req.body.studentid,
      courseid: req.body.courseid
    },
    (err, results) => {
      if (err) throw err;
      req.flash('success', 'Course is successfully assigned');
      res.redirect('/students/' + req.body.studentid);
    }
  );
});

// Export the router
module.exports = router;
