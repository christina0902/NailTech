const mongoose = require('mongoose'); // Import Mongoose for interacting with MongoDB.
const Schema = mongoose.Schema; // Create a shorthand reference to Mongoose's Schema constructor.

// Define the Time Off schema
const timeOffSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String} // Optional reason for the time off.
}, { 
  _id: false  // Disable the automatic generation of _id for this subdocument schema
});

// Export the timeOffSchema for use in other schemas (e.g., UserProfile)
module.exports = timeOffSchema;
 