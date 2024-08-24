const UserProfile = require('../models/UserProfile.js') // Import the UserProfile model to interact with user profiles in the database.

// GET all users
const getUserProfile = async (req, res) => {
    try {
        const userprofiles = await UserProfile.find({}) // Retrieve all user profiles from the database.
        res.status(200).json(userprofiles) // Send the retrieved user profiles as a JSON response with a 200 status code.
    }
    catch (error) {
        res.status(500).json({ message: error.message }) // Send a 500 status code and error message if there is a server error.
    }
}

// GET user by Id
const getUserById = async (req, res) => {
    try {
        const { id } = req.params // Extract the user ID from the request parameters.
        const userprofile = await UserProfile.findById(id) // Find a user profile by ID in the database.
        res.status(200).json(userprofile)  // Send the retrieved user profile as a JSON response with a 200 status code.
    }
    catch (error) {
        res.status(500).json({message: error.message}) // Send a 500 status code and error message if there is a server error.
        // TODO: Improve error handling for more detailed responses.
    }
}

// POST new user
const createNewUser = async (req, res) => {
    try {
        const userprofile = await UserProfile.create(req.body)  // Create a new user profile in the database using the request body.
        res.status(200).json(userprofile) // Send the created user profile as a JSON response with a 200 status code.
    }
    catch (error) {
        res.status(500).json({message: error.message}) // Send a 500 status code and error message if there is a server error.
    }
}

// Update a user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params // Extract the user ID from the request parameters.
        const user = await UserProfile.findByIdAndUpdate(id, req.body)  // Update the user profile in the database with the new data from the request body.

        if (!user) {
            return res.status(400).json({message: "User not found"}) // Send a 400 status code and message if the user is not found.
        }

        const updatedUser = await UserProfile.findById(id) // Retrieve the updated user profile.
        res.status(200).json(updatedUser) // Send the updated user profile as a JSON response with a 200 status code.
    }
    catch (error) {
        res.status(500).json({message : error.message}) // Send a 500 status code and error message if there is a server error.
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params // Extract the user ID from the request parameters.
        const user = await UserProfile.findByIdAndDelete(id) // Delete the user profile from the database by ID.

        if (!user) {
            return res.status(404).json({message: "User not found"}) // Send a 404 status code and message if the user is not found.
        }

        res.status(200).json({message: "User deleted successfully!"}) // Send a 200 status code and success message if the user is deleted.
    }
    catch {
        res.status(500).json({message: error.message})  // Send a 500 status code and error message if there is a server error.
    }
}

module.exports = {
    getUserProfile,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
}