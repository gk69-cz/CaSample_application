const mongoose = require('mongoose');

// MongoDB URI for MongoDB Atlas
const uri = 'mongodb+srv://Admin:Admin@cluster0.9cl0e.mongodb.net/';

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB Atlas
    await mongoose.connect(uri);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
