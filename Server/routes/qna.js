// Brind in modules
const express = require("express");
const router = express.Router();

// Models
const Question = require("../models/Question");
const Answer = require("../models/Answer");

// Bring in the database connection
const connection = require("../relational/database");

// Load the qna page
router.get("/", (req, res) => {
  connection.query("SELECT * FROM Questions", (err, result) => {
    console.log(result);
    res.render("qna");
  });
});

router.post("/add", (req, res) => {
  let question = new Question(
    req.body.question,
    1 // Temp solution
  );

  let validationErrors = question.validate();
  if (validationErrors) {
    res.render("qna", {
      error: validationErrors.details
    });
  } else {
    connection.query("INSERT INTO Questions SET ?", question, (err, result) => {
      if (err) throw err;
      res.render("qna");
    });
  }
});

// Export the router
module.exports = router;
