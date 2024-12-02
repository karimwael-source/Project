const express = require('express');
const User = require('../models/User');  // Import the User model
const router = express.Router();

// Route to create a new user (signup)
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create a new user
  const newUser = new User({
    name,
    email,
    password,  // The password will be hashed by middleware in the User schema
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

module.exports = router;
