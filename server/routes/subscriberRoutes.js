const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// @route   POST /api/subscribe
// @desc    Handle newsletter subscription database entry
// @access  Public
router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required." });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();

    // Check if the email is already subscribed
    let subscriber = await Subscriber.findOne({ email: normalizedEmail });

    if (subscriber) {
      return res.status(400).json({ message: "Email is already subscribed." });
    }

    // Create a new subscriber matrix document
    subscriber = new Subscriber({ email: normalizedEmail });
    await subscriber.save();

    return res.status(201).json({ message: "Successfully subscribed to the journal!" });
  } catch (error) {
    console.error("Subscription Database Error:", error);
    return res.status(500).json({ message: "Server Error. Failed to store coordinate registration." });
  }
});

module.exports = router;