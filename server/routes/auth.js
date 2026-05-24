// Authentication Routes - Handles signup and login
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// SIGNUP Route
// Creates a new user account
router.post('/signup', async (req, res) => {
  try {
    // Get data from request body
    const { name, email, password } = req.body;

    // Simple validation - Check if fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists with this email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password // For simplicity, storing plain text (not recommended for production)
    });

    // Save user to database
    await newUser.save();

    // Return success response
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    // Handle any errors
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// LOGIN Route
// Authenticates user and returns user info
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password (simple comparison)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if user is admin
    const isAdmin = email === 'admin@civicreport.com';

    // Return user data (client will store in localStorage)
    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

module.exports = router;
