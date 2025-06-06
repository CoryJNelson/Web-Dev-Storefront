const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');
const errorHandler = require("./app/middlewares/errorHandler");
const routes = require("./app/config/router");
const connectDB = require("./db/mongoose");

// We don't want sensitive information in our source code!
dotenv.config({ path: '../.env' });

// Initialize the express app
const app = express();

// Use cors middleware
app.use(cors({ origin: 'http://localhost:5173' }));

// parsing JSON payloads
app.use(express.json());

// routes
app.use("/api", routes);

// Attach error handler
app.use(errorHandler);

// Connect Database
connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to the Store!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is active at http://localhost:${process.env.PORT}...`);
});