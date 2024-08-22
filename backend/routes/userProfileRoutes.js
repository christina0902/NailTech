const express = require("express") // Import the Express library.
const router = express.Router() // Create a new router object for defining routes.
const userController = require("../controllers/userController.js") // Import UserControllers

// Define routes

// Route to get all user profiles
router.get('/', userController.getUserProfile);

// Route to get a user by their ID
router.get('/:id', userController.getUserById);

// Route to update a user's details by their ID
router.put('/:id', userController.updateUser);

// Route to create a new user profile
router.post('/', userController.createNewUser)

// Route to delete a user profile by their ID
router.delete('/:id', userController.deleteUser)

module.exports = router; // Export the router object so it can be used in other parts of the application.