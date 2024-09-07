const Service = require('../models/Service.js') // Import the Service model to interact with Service in the database.

// serviceSeed.js
const serviceSeedData = [
  {
    name: 'Basic Manicure',
    description: 'A basic manicure including nail trimming, shaping, cuticle care, and polish application.',
    duration: 30, // Duration in minutes
    price: 25, // Price in dollars
    nailTech: '66dbf43f644c3814fd4287a9', // Replace with the actual ObjectId of a nail tech from your database
  },
  {
    name: 'Gel Manicure',
    description: 'Includes a manicure with gel polish that lasts longer and provides a glossy finish.',
    duration: 45,
    price: 40,
    nailTech: '66dbf43f644c3814fd4287aa', // Replace with the actual ObjectId of a nail tech from your database
  },
  {
    name: 'Acrylic Full Set',
    description: 'Full set of acrylic nails with your choice of shape, length, and polish.',
    duration: 90,
    price: 70,
    nailTech: '66dbf43f644c3814fd4287a9', // Replace with the actual ObjectId of another nail tech
  },
  {
    name: 'Nail Art Add-On',
    description: 'Add intricate nail art designs to your existing manicure service.',
    duration: 20,
    price: 15,
    nailTech: '66dbf43f644c3814fd4287aa', // Replace with the actual ObjectId of another nail tech
  },
  {
    name: 'Deluxe Pedicure',
    description: 'A relaxing pedicure that includes exfoliation, foot massage, and polish.',
    duration: 60,
    price: 55,
    nailTech: '66dbf43f644c3814fd4287a9', // Replace with the actual ObjectId of a nail tech from your database
  },
  {
    name: 'Dip Powder Nails',
    description: 'A manicure using dip powder for a durable, long-lasting finish without UV light.',
    duration: 60,
    price: 50,
    nailTech: '66dbf43f644c3814fd4287aa', // Replace with the actual ObjectId of another nail tech
  },
];

const seedServices = async () => {
    await Service.collection.drop();
    console.log('Services collection cleared');

    Service.insertMany(serviceSeedData)
    console.log('Services seeded successfully');
}

module.exports = seedServices