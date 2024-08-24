const mongoose = require('mongoose'); // Import Mongoose for interacting with MongoDB.
const Schema = mongoose.Schema;  // Create a shorthand reference to Mongoose's Schema constructor.
const AvailablilitySchema = require('./schemas/availablilitySchema'); // Import the availability schema
const TimeOffSchema = require('./schemas/timeOffSchema'); // Import the time off schema

const userProfileSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['nail_tech', 'client'] }, // User role, must be either 'nail_tech' or 'client'.
  profileImage: { type: String }, // URL or path to the profile image,
  location: { // Embedded document for the user's location.
    address: { type: String }, // e.g., '123 Main St'
    city: { type: String },    // e.g., 'New York'
    state: { type: String },   // e.g., 'NY'
    postalCode: { type: String }, // e.g., '10001'
    country: { type: String }   // e.g., 'USA'
  },
  availablility: {
    type: [AvailablilitySchema], // Array of availability entries based on the Availability schema.
    default: [], // Default value is an empty array.
    validate: {
      validator: function(v) {
         // Custom validation to ensure availability is only required for 'nail_tech' role.
        return this.role !== 'nail_tech' || (v && v.length > 0);
      },
      message: 'Availability is required for nail techs.'  // Error message if validation fails.
    }
  },
  timeOff: {
    type: [TimeOffSchema], // Array of time off entries based on the Time Off schema.
    default: [] // Default value is an empty array, only applicable for 'nail_tech'.
  }
}, {
  timestamps: true // Automatically manage `createdAt` and `updatedAt` timestamps.
});

// Create a composite index to ensure unique availability entries for each user
userProfileSchema.index({
  'availablility.dayOfWeek': 1,
  'availablility.startTime': 1,
  'availablility.endTime': 1,
  userId: 1
}, { unique: true }); // Ensure that the combination of these fields is unique.

// Validation to ensure availability and timeOff are only set for nail techs
userProfileSchema.pre('save', function(next) {
  if (this.role === 'nail_tech') { // Only validate if the user is a nail tech.
    if (!Array.isArray(this.availablility) || !Array.isArray(this.timeOff)) {
      return next(new Error('Availability and timeOff must be arrays for nail techs')); // Throw error if not arrays.
    }
  } else {
    this.availablility = []; // Clear availability if the role is not 'nail_tech'.
    this.timeOff = []; // Clear time off if the role is not 'nail_tech'.
  }
  next(); // Proceed with saving the document.
});

// Create the UserProfile model using the schema
const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile; // Export the UserProfile model for use in other parts of the application.
