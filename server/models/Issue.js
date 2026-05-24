// Issue Model - Stores civic issue complaints
const mongoose = require('mongoose');

// Define the structure for issue documents
const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is mandatory
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Road Damage', 'Garbage', 'Water Leakage', 'Street Light', 'Drainage', 'Other']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String, // Stores the image file path
    default: '' // Optional field
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending' // New issues start as Pending
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the User model
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export the Issue model
module.exports = mongoose.model('Issue', issueSchema);
