const express = require('express');
const path = require('path');
const helloRouter = require('./helloRouter'); // Import the router file

const app = express();

// Serve static files, including index.html
app.use(express.static(path.join(__dirname)));

// Use the helloRouter for API routes
app.use('/api', helloRouter);

// Default route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
