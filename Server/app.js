// Bring in modules
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

// Initialize the main app
const app = express();

// Set the view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Set the static folder location
app.use(express.static(path.join(__dirname, "public")));

// Index route
app.get("/manage", (req, res) => {
  res.render("manage");
});

// Start the server on given port
app.listen(3000, () => console.log("Server started on port 3000"));
