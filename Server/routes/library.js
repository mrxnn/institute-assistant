// Brind in modules
const express = require("express");
const router = express.Router();

// Events model
const Book = require("../models/Book");

// Bring in the database connection
const connection = require("../relational/database");

// Library page
router.get("/", (req, res) => {
  connection.query("SELECT * FROM Books", (err, results) => {
    if (err) throw err;
    res.render("library", {
      books: results
    });
  });
});

router.get("/addbook", (req, res) => {
  res.render("book-form", {
    actionOnSubmit: "create"
  });
});

router.post("/addbook", (req, res) => {
  const book = new Book(
    req.body.title,
    req.body.description,
    req.body.author,
    req.body.publisher,
    "Available"
  );

  // Validate the model
  const validationErrors = book.validate().error;

  if (validationErrors) {
    res.render("book-form", {
      error: validationErrors.details[0].message
    });
  } else {
    connection.query("INSERT INTO Books SET ?", book, (error, results) => {
      if (error) throw error;
      res.redirect("/library");
    });
  }
});

// Update student
router.post("/update/:id", (req, res) => {
  const event = new Event(
    req.body.title,
    req.body.description,
    req.body.date,
    req.body.time,
    req.body.location
  );

  // Validate the model
  const validationErrors = event.validate().error;

  if (validationErrors) {
    res.render("event-form", {
      error: validationErrors.details[0].message,
      event: event
    });
  } else {
    connection.query(
      "UPDATE Events SET Title=?, Description=?, Date=?, Time=?, Location=? WHERE Id=?",
      [
        event.title,
        event.description,
        event.date,
        event.time,
        event.location,
        req.params.id
      ],
      (error, results) => {
        if (error) throw error;
        res.redirect("/events");
      }
    );
  }
});

// export the router module
module.exports = router;
