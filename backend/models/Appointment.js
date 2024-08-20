const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  nailTechId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
  appointmentDate: { type: Date, required: true },
  status: { type: String, required: true, enum: ['Scheduled', 'Completed', 'Cancelled'] },
  services: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true }
  }]
}, {
  timestamps: true
});

// Pre-save validation to ensure the appointment date is valid
appointmentSchema.pre('save', async function(next) {
  const appointment = this;
  
  // Check if appointmentDate is in the past
  const now = new Date();
  if (appointment.appointmentDate < now) {
    return next(new Error('Appointment date cannot be in the past'));
  }
  
  // Fetch the nail tech's profile to check availability and time off
  const UserProfile = mongoose.model('UserProfile');
  const nailTech = await UserProfile.findById(appointment.nailTechId);
  
  if (!nailTech) {
    return next(new Error('Nail tech not found'));
  }
  
  // Check if the appointment date falls on one of the nail tech's available days
  const appointmentDay = appointment.appointmentDate.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., 'Monday'
  const appointmentTime = appointment.appointmentDate.toTimeString().split(' ')[0]; // e.g., '09:00:00'

  const isAvailable = nailTech.availability.some(availability => {
    return availability.dayOfWeek === appointmentDay &&
           availability.startTime <= appointmentTime &&
           availability.endTime >= appointmentTime;
  });
  
  if (!isAvailable) {
    return next(new Error('Appointment date and time is not within the nail tech\'s availability'));
  }
  
  // Check if the appointment date is during the nail tech's time off
  const isDuringTimeOff = nailTech.timeOff.some(timeOff => {
    return appointment.appointmentDate >= timeOff.startDate && 
           appointment.appointmentDate <= timeOff.endDate;
  });

  if (isDuringTimeOff) {
    return next(new Error('Appointment date falls during the nail tech\'s time off'));
  }
  
  next();
});

// Indexes
appointmentSchema.index({ nailTechId: 1 });
appointmentSchema.index({ clientId: 1 });

// Export Model
const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;