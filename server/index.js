// Main Server File - Entry point for the backend
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const issueRoutes = require('./routes/issues');

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
// Using local MongoDB connection (make sure MongoDB is running)
const MONGODB_URI = process.env.MONGO_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/issues', issueRoutes); // Issue management routes

// Seed demo data on server start
const User = require('./models/User');

async function seedDemoUsers() {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@civicreport.com' });
    if (!adminExists) {
      // Create admin user
      const admin = new User({
        name: 'Admin User',
        email: 'admin@civicreport.com',
        password: 'admin123'
      });
      await admin.save();
      console.log('Demo admin user created');
    }

    // Check if demo citizen exists
    const citizenExists = await User.findOne({ email: 'citizen@demo.com' });
    if (!citizenExists) {
      // Create demo citizen user
      const citizen = new User({
        name: 'Demo Citizen',
        email: 'citizen@demo.com',
        password: 'demo123'
      });
      await citizen.save();
      console.log('Demo citizen user created');
    }
  } catch (error) {
    console.error('Error seeding demo users:', error);
  }
}

// Run seeding
seedDemoUsers();

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  POST /api/auth/signup - Create account`);
  console.log(`  POST /api/auth/login - Login`);
  console.log(`  GET  /api/issues - Get all issues`);
  console.log(`  POST /api/issues - Submit new issue`);
  console.log(`  PUT  /api/issues/:id - Update issue status`);
});
