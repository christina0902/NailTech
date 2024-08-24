const mongoose = require('mongoose'); // Import Mongoose for interacting with MongoDB.
const Schema = mongoose.Schema; // Create a shorthand reference to Mongoose's Schema constructor.

// Define the Service schema
const serviceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  price: { type: Number, required: true },
  nailTech: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true } // Reference to the nail tech who offers this service, required field.
});

// Create the Service model using the schema
const Service = mongoose.model('Service', serviceSchema);

module.exports = Service; // Export the Service model for use in other parts of the application.
