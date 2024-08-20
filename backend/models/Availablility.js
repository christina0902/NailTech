const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const availablilitySchema = new Schema({
  dayOfWeek: { 
    type: String, 
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 
    required: true 
  },
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  }
}, {
  _id: false
});

// Custom validation to ensure endTime is after startTime
availablilitySchema.pre('save', function(next) {
  const startTime = this.startTime.split(':').map(Number);
  const endTime = this.endTime.split(':').map(Number);
  
  if (startTime[0] > endTime[0] || (startTime[0] === endTime[0] && startTime[1] >= endTime[1])) {
    return next(new Error('End time must be after start time'));
  }
  
  next();
});

module.exports = availablilitySchema;
