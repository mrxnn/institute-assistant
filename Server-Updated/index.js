// Bring in required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize the main app
const app = express();

// Set the static directory
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine and views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Index endpoint
app.get('/', (req, res) => res.render('index'));
app.get('/dashboard', (req, res) => res.render('dashboard'));

// Set the route files
app.use('/students', require('./routes/students'));
app.use('/employees', require('./routes/employees'));

// Start the server
app.listen(3000, () => console.log('Started on http://localhost:3000'));
