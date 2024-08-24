const mongoose = require('mongoose'); // Import Mongoose for interacting with MongoDB.
const Schema = mongoose.Schema; // Create a shorthand reference to Mongoose's Schema constructor.

// Define the Appointment schema
const appointmentSchema = new Schema({
  nailTechId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true }, // Reference to the nail tech's user profile, required field.
  clientId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },  // Reference to the client's user profile, required field.
  appointmentDate: { type: Date, required: true }, // Date and time of the appointment, required field.
  status: { type: String, required: true, enum: ['Scheduled', 'Completed', 'Cancelled'] }, // Status of the appointment with limited options.
  services: [{ type: Schema.Types.ObjectId, ref: 'Service' }] // Array of services included in the appointment, referencing the Service model.
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
    return availability.dayOfWeek === appointmentDay && // Check if the day of the appointment matches an available day.
           availability.startTime <= appointmentTime && // Ensure the appointment start time falls within availability.
           availability.endTime >= appointmentTime; // Ensure the appointment end time falls within availability.
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
  
    // Check for existing appointments at the same time
   const existingAppointment = await mongoose.model('Appointment').findOne({
    nailTechId: appointment.nailTechId,
    appointmentDate: appointment.appointmentDate,
    _id: { $ne: appointment._id } // Exclude the current appointment if updating
  });

  if (existingAppointment) {
    return next(new Error('An appointment already exists at the same time and date'));
  }
  
  next(); // Proceed with saving the document if all validations pass.
});

// Indexes to improve query performance
appointmentSchema.index({ nailTechId: 1 });
appointmentSchema.index({ clientId: 1 });

// Export Model
const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;