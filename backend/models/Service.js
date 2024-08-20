const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  price: { type: Number, required: true },
  nailTech: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true } // Reference to nail tech
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
