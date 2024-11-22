// Mongoose - ODM (Object Data Modeling) library for MongoDB
const mongoose = require("mongoose");

// Database connection
const connectDB = () => {
    mongoose.connect(
        process.env.DB_URL
    ).then(
        () => console.log("Connected...") // verify successful connection
    ).catch((err) => {
        console.error(`Error: Database connection failed\n${err.message}`);
        process.exit(1); // exits the Node process
    });
};

module.exports = connectDB;