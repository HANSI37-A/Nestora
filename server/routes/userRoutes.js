const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    user = new User({ name, email, password });
    await user.save();

   //Create JWT token
   const payload = { user: { id: user._id, role: user.role } };
   
   //Sign and return the token 
   jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
     if (err) throw err;
     res.status(201).json({ 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
   });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if(!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await user.matchPassword(password);

    if(!isMatch) 
      return res.status(400).json({ message: 'Invalid credentials' });

     const payload = { user: { id: user._id, role: user.role } };
   
   //Sign and return the token 
   jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
     if (err) throw err;
     res.status(201).json({ 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token
    });
   });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }

});

// @route GET /api/users/profile
// @desc Get user profile
// @access Private
router.get('/profile', protect, async (req, res) => {
 try {
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Explicitly return the authenticated user's data back to Postman
    res.status(200).json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error fetching profile data" });
  }
});

module.exports = router;