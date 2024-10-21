const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to the Store!');
});

app.listen(PORT, () => {
    console.log(`Server is active at http://localhost:${PORT}...`);
});