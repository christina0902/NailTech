const mongoose = require('mongoose'); // Import Mongoose for interacting with MongoDB.

// Connection to DB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://christinam:Cm7388*@simpledb.klwmq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=SimpleDB', {
        });
        console.log("Connected to database");
    } catch (error) {
        console.error("Connection Failed", error);
        process.exit(1); // Exit the process with failure
    }
};

    
module.exports = connectDB;