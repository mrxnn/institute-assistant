// Bring in modules
const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize the main app
const app = express();

// parse application/x-www-form-urlencoded, and json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set the view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set the static folder location
app.use(express.static(path.join(__dirname, "public")));

// main route for the dashboard
app.get("/manage", (req, res) => {
  res.render("manage");
});

// Reroute all the requests to /students
let students = require("./routes/students");
app.use("/students", students);

// Start the server on given port
app.listen(3000, () => console.log("Server started on port 3000"));
