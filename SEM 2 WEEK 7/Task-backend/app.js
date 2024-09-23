const express = require('express');
const cors = require('cors'); // Import cors
const app = express();
const connection = require('./src/config/config/db');
const admin = require('./src/routes/adminroutes');

// Use environment variables for PORT
const PORT = process.env.PORT || 5000;

// Initialize the database connection
connection();

// Use JSON middleware
app.use(express.json());

// Use CORS middleware
app.use(cors());  // Enable CORS for all routes

// Home route
app.get('/', (req, res) => {
  console.log("HOME route accessed");
  res.send("Hello World!");
});

// Admin routes
app.use('/api', admin);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
