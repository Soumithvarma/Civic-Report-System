
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// SIGNUP Route

router.post('/signup', async (req, res) => {
  try {

    const { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create
    const newUser = new User({
      name,
      email,
      password 
    });


    await newUser.save();

    
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
 
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// LOGIN Route

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

  
    const isAdmin = email === 'admin@civicreport.com';

  
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
