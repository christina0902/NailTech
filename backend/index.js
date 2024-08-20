const express = require('express')
const mongoose = require('mongoose');
const UserProfile = require('./models/UserProfile.js')

const app = express()

app.use(express.json())

mongoose.connect('mongodb+srv://christinam:Cm7388*@simpledb.klwmq.mongodb.net/Node-API?retryWrites=true&w=majority&appName=SimpleDB')
    .then(() => {
        console.log("Connected to database")
    })
    .catch (() => {
        console.log("Connection Failed")
    })

app.get('/', function (req, res) {
  res.send('Hello from Node API Yall')
})
app.listen(3001, () => {
    console.log("Server is running on port 3001.");
});

app.get('/api/UserProfile', async (req, res) => {
    try {
        const userprofiles = await UserProfile.find({})
        res.status(200).json(userprofiles)
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
})

app.post('/api/UserProfile', async (req, res) => {
    try {
        const userprofile = await UserProfile.create(req.body)
        res.status(200).json(userprofile)
    }
    catch (error) {
        res.status(500).json({message: error.message})
    }
})