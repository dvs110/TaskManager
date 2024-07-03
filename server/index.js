const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection


// Routes
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);
const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("connected to mondodb");
    } catch (error) {
        throw error;
    }
};



mongoose.connection.on('disconnected', () => { //if mongodb got disconnected
    console.log("mongodb disconnected");
});
app.listen(PORT, () => {
    connect();
    console.log(`Server running on http://localhost:${PORT}`);
});
