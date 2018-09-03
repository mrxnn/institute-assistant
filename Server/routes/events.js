// Brind in modules
const express = require("express");
const router = express.Router();

// Events model
const Event = require("../models/Event");

// Bring in the database connection
const connection = require("../relational/database");

// Events page
router.get("/", (req, res) => {
  connection.query("SELECT * FROM Events", (err, results) => {
    if (err) throw err;
    res.render("events", {
      events: results
    });
  });
});

router.get("/new", (req, res) => {
  res.render("event-form", {
    actionOnSubmit: "create"
  });
});

router.post("/create", (req, res) => {
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
      error: validationErrors.details[0].message
    });
  } else {
    connection.query("INSERT INTO Events SET ?", event, (error, results) => {
      if (error) throw error;
      console.log(results.insertId);
      res.redirect("/events");
    });
  }
});

// Single event profile
router.get("/:id", (req, res) => {
  connection.query(
    "SELECT * FROM Events WHERE Id = ?",
    req.params.id,
    (err, result) => {
      if (err) throw err;
      console.log(result);
      res.render("event-form", {
        event: result[0],
        actionOnSubmit: "update/" + req.params.id
      });
    }
  );
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
