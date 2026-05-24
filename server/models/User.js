// User Model - Stores user information
const mongoose = require('mongoose');

// Define the structure for user documents
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is mandatory
    trim: true // Removes extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // Each email must be unique
    trim: true,
    lowercase: true // Converts email to lowercase
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically sets current date
  }
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
