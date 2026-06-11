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
   jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
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
   jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" }, (err, token) => {
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

router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      
      user.name = req.body.name || user.name;
      
      if (req.body.email && req.body.email !== user.email) {
        const emailExists = await User.findOne({ email: req.body.email.toLowerCase() });
        if (emailExists) {
          return res.status(400).json({ message: 'Email address is already in use.' });
        }
        user.email = req.body.email.toLowerCase();
      }

      if (req.body.password) {
        if (req.body.password.length < 6) {
          return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
        }
        user.password = req.body.password;
      }

      if (req.body.phone !== undefined) {
        user.phone = req.body.phone;
      }

      if (req.body.shippingAddress) {
        user.shippingAddress = {
          addressLine: req.body.shippingAddress.addressLine || user.shippingAddress?.addressLine || "",
          city: req.body.shippingAddress.city || user.shippingAddress?.city || "",
          state: req.body.shippingAddress.state || user.shippingAddress?.state || "",
          postalCode: req.body.shippingAddress.postalCode || user.shippingAddress?.postalCode || "",
          country: req.body.shippingAddress.country || user.shippingAddress?.country || ""
        };
      }

      const updatedUser = await user.save();
      const payload = { user: { id: updatedUser._id, role: updatedUser.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" });

      res.status(200).json({
        message: 'Profile updated successfully',
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          phone: updatedUser.phone,
          shippingAddress: updatedUser.shippingAddress,
        },
        token: token
      });
    } else {
      res.status(404).json({ message: 'User account not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server error modifying user profile' });
  }
});

module.exports = router;