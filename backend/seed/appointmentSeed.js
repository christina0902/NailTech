const Appointment = require('../models/Appointment.js') // Import the Appointment model to interact with Appointment in the database.

// appointmentSeed.js
const appointmentDataSeed = [
  {
    nailTechId: '64f9c4d8451b5e29f4d8e7d5', // Replace with actual ObjectId of a nail tech
    clientId: '64f9c4d8451b5e29f4d8e7d8', // Replace with actual ObjectId of a client
    appointmentDate: new Date('2024-09-15T10:00:00Z'), // Example date and time
    status: 'Scheduled',
    services: [
      '64f9c4d8451b5e29f4d8e7d9', // Replace with actual ObjectId of a service
      '64f9c4d8451b5e29f4d8e7da'  // Replace with actual ObjectId of another service
    ]
  },
  {
    nailTechId: '64f9c4d8451b5e29f4d8e7d6', // Replace with actual ObjectId of another nail tech
    clientId: '64f9c4d8451b5e29f4d8e7d9', // Replace with actual ObjectId of another client
    appointmentDate: new Date('2024-09-16T14:00:00Z'), // Example date and time
    status: 'Scheduled',
    services: [
      '64f9c4d8451b5e29f4d8e7db' // Replace with actual ObjectId of a service
    ]
  },
  {
    nailTechId: '64f9c4d8451b5e29f4d8e7d5', // Replace with actual ObjectId of a nail tech
    clientId: '64f9c4d8451b5e29f4d8e7da', // Replace with actual ObjectId of a client
    appointmentDate: new Date('2024-09-17T09:00:00Z'), // Example date and time
    status: 'Scheduled',
    services: [
      '64f9c4d8451b5e29f4d8e7dc' // Replace with actual ObjectId of a service
    ]
  },
  {
    nailTechId: '64f9c4d8451b5e29f4d8e7d7', // Replace with actual ObjectId of another nail tech
    clientId: '64f9c4d8451b5e29f4d8e7d8', // Replace with actual ObjectId of another client
    appointmentDate: new Date('2024-09-18T11:30:00Z'), // Example date and time
    status: 'Completed',
    services: [
      '64f9c4d8451b5e29f4d8e7dd' // Replace with actual ObjectId of a service
    ]
  },
];

const seedAppointments = async () => {
    await Appointment.collection.drop();
    console.log('Users collection cleared');

    Appointment.insertMany(appointmentDataSeed)
    console.log('Users seeded successfully');
}

module.exports = seedAppointments