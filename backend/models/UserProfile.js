const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AvailablilitySchema = require('./Availablility'); // Import availability schema
const TimeOffSchema = require('./TimeOff'); // Import time off schema

const userProfileSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  userName: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['nail_tech', 'client'] },
  profileImage: { type: String }, // URL or path to the profile image
  availablility: {
    type: [AvailablilitySchema],
    default: [],
    validate: {
      validator: function(v) {
        // Availability is required only if the role is 'nail_tech'
        return this.role !== 'nail_tech' || (v && v.length > 0);
      },
      message: 'Availability is required for nail techs.'
    }
  },
  timeOff: {
    type: [TimeOffSchema], // Only for nail techs
    default: []
  }
}, {
  timestamps: true
});

// Validation to ensure availability and timeOff are only set for nail techs
userProfileSchema.pre('save', function(next) {
  if (this.role === 'nail_tech') {
    if (!Array.isArray(this.availablility) || !Array.isArray(this.timeOff)) {
      return next(new Error('Availability and timeOff must be arrays for nail techs'));
    }
  } else {
    this.availablility = [];
    this.timeOff = [];
  }
  next();
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = UserProfile;
