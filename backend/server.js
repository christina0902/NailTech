const express = require('express') // Import the Express library for building web applications.
const userProfileRoute = require("./routes/userProfileRoutes.js") // Import the userProfile routes
const connectDB = require('./config/db.js');
const app = express()  // Initialize Express application

app.use(express.json()) // Parse incoming JSON requests
app.use(express.urlencoded({extended: false})) // Parse form data


// Connect to Database
connectDB();

// Use Routes
app.use('/api/UserProfile', userProfileRoute);

// Export the app
module.exports = app;
