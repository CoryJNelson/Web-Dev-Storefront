const express = require('express');
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// We don't want sensitive information in our source code!
dotenv.config({ path: '../.env' });

// Initialize the express app
const app = express();

// Connect to the database
mongoose.connect(
    process.env.DB_URL
).then(
    () => console.log("Connected...") // verify successful connection
).catch((err) => {
    console.error(`Error: Database connection failed\n${err.message}`);
    process.exit(1); // exits the Node process
});

app.get('/', (req, res) => {
    res.send('Welcome to the Store!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is active at http://localhost:${process.env.PORT}...`);
});