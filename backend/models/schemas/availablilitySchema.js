const mongoose = require('mongoose');  // Import Mongoose for interacting with MongoDB.
const Schema = mongoose.Schema; // Create a shorthand reference to Mongoose's Schema constructor.

// Define the Availability schema
const availablilitySchema = new Schema({
  dayOfWeek: { 
    type: String, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
    required: true 
  },
  startTime: { 
    type: String, // Time format: 'HH:mm' (e.g., '09:00' for 9 AM)
    required: true 
  },
  endTime: { 
    type: String, // Time format: 'HH:mm' (e.g., '17:00' for 5 PM)
    required: true 
  }
}, {
  _id: false // Disable automatic generation of _id for this subdocument schema.
});

// Custom validation to ensure endTime is after startTime
availablilitySchema.pre('save', function (next) {
    // Split startTime and endTime into [hours, minutes] arrays for comparison
  const startTime = this.startTime.split(':').map(Number);
  const endTime = this.endTime.split(':').map(Number);
  
    // Ensure that the end time is after the start time
  if (startTime[0] > endTime[0] || (startTime[0] === endTime[0] && startTime[1] >= endTime[1])) {
    return next(new Error('End time must be after start time'));
  }
  
  next(); // Proceed if validation passes
});

module.exports = availablilitySchema;  // Export the availability schema for use in other schemas.
