const UserProfile = require('../models/UserProfile.js') 

const userDataSeed = [
  // Sample Nail Techs
  {
    firstName: 'Emily',
    lastName: 'Smith',
    email: 'emily_nailtech@example.com',
    phoneNumber: '123-456-7890',
    userName: 'emily_nailtech',
    role: 'nail_tech',
    profileImage: 'https://example.com/images/emily.jpg',
    location: {
      address: '456 Elm St',
      city: 'Los Angeles',
      state: 'CA',
      postalCode: '90001',
      country: 'USA',
    },
    availablility: [
      {
        dayOfWeek: 'Monday',
        startTime: '09:00:00',
        endTime: '17:00:00',
      },
      {
        dayOfWeek: 'Wednesday',
        startTime: '12:00:00',
        endTime: '18:00:00',
      },
    ],
    timeOff: [
      {
        startDate: new Date('2024-09-10'),
        endDate: new Date('2024-09-12'),
        reason: 'Vacation',
      },
    ],
  },
  {
    firstName: 'Sophia',
    lastName: 'Johnson',
    email: 'sophia_nailtech@example.com',
    phoneNumber: '987-654-3210',
    userName: 'sophia_nailtech',
    role: 'nail_tech',
    profileImage: 'https://example.com/images/sophia.jpg',
    location: {
      address: '789 Maple Ave',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
    },
    availablility: [
      {
        dayOfWeek: 'Tuesday',
        startTime: '10:00:00',
        endTime: '15:00:00',
      },
      {
        dayOfWeek: 'Thursday',
        startTime: '14:00:00',
        endTime: '20:00:00',
      },
    ],
    timeOff: [],
  },

  // Sample Clients
  {
    firstName: 'Jessica',
    lastName: 'Brown',
    email: 'jessica_client@example.com',
    phoneNumber: '555-123-4567',
    userName: 'jessica_client',
    role: 'client',
    profileImage: 'https://example.com/images/jessica.jpg',
    location: {
      address: '123 Oak St',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60601',
      country: 'USA',
    },
    availablility: [], // No availability for clients
    timeOff: [], // No time off for clients
  },
  {
    firstName: 'Michael',
    lastName: 'Green',
    email: 'michael_client@example.com',
    phoneNumber: '555-987-6543',
    userName: 'michael_client',
    role: 'client',
    profileImage: 'https://example.com/images/michael.jpg',
    location: {
      address: '321 Pine St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94102',
      country: 'USA',
    },
    availablility: [],
    timeOff: [],
  },
];

const seedUsers = async () => {
    await UserProfile.collection.drop();
    console.log('Users collection cleared');

    UserProfile.insertMany(userDataSeed)
    console.log('Users seeded successfully');
}

module.exports = seedUsers