const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const db = require('../relational/database');

/**
 * GET
 * http://localhost:3000/courses
 */
router.get('/', (req, res) => {
  db.query('SELECT * FROM Courses', (err, results) => {
    res.render('courses', {
      courses: results
    });
  });
});

/**
 * GET
 * http://localhost:3000/courses/add
 */
router.get('/add', (req, res) => {
  res.render('course-add-form');
});

/**
 * GET
 * http://localhost:3000/course/1
 */
router.get('/:id', (req, res) => {
  db.query(
    'SELECT * FROM Courses WHERE Id = ?',
    req.params.id,
    (err, results) => {
      if (err) throw err;
      console.log(results);
      res.render('course-profile', {
        course: results[0]
      });
    }
  );
});

/**
 * POST
 * http://localhost:3000/courses/add
 */
router.post('/add', (req, res) => {
  // Make the course
  const course = new Course(
    req.body.title,
    req.body.description,
    req.body.duration,
    req.body.level,
    req.body.maximumStudents
  );

  // Validate the course
  const error = course.validate().error;
  if (error !== null) {
    req.flash('error', error.details[0].message);
    res.redirect('/courses/add');
    return;
  }

  // Add the course
  db.query('INSERT INTO Courses SET ?', course, (err, result) => {
    if (err) throw err;
    req.flash('success', 'Course is successfully added');
    res.status(201).redirect('/courses');
  });
});

/**
 * GET
 * http://localhost:3000/courses/edit/1
 */
router.get('/edit/:id', (req, res) => {
  db.query(
    'SELECT * FROM Courses WHERE Id = ?',
    req.params.id,
    (err, results) => {
      if (err) throw err;
      res.render('course-edit-form', {
        course: results[0]
      });
    }
  );
});

/**
 * POST
 * http://localhost:3000/courses/edit
 */
router.post('/edit', (req, res) => {
  db.query('UPDATE Courses SET title=?, description=?, duration=?, level=?, maximumStudents=? WHERE id=?',
    [
      req.body.title,
      req.body.description,
      req.body.duration,
      req.body.level,
      req.body.maximumStudents,
      req.body.id
    ], (err, results) => {
      if (err)
        throw err;
      req.flash('success', 'Course is successfully updated')
      res.redirect('/courses');
    });
});

/**
 * DELETE
 * http://localhost:3000/courses/delete/1
 */
router.delete('/delete/:id', (req, res) => {
  db.query(
    'DELETE FROM Courses WHERE Id = ?',
    req.params.id,
    (err, results) => {
      if (err) throw err;
      req.flash('success', 'Course is successfully removed');
      res.status(200).json({ message: 'Course deleted' });
    }
  );
});

// Export the router
module.exports = router;