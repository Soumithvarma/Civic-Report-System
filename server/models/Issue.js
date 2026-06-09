// Issue Model
const mongoose = require('mongoose');


const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
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
    type: String, 
    default: '' 
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Resolved'],
    default: 'Pending' 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


module.exports = mongoose.model('Issue', issueSchema);
