// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/database'); // Import MongoDB connection
const blogRoutes = require('./routes/blogRoutes'); // Import blog routes

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use('/api', blogRoutes); // All blog routes are prefixed with /api

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
