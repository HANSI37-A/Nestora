const express = require("express");
const router = express.Router();
const Designer = require("../models/Designer");

// @route   GET /api/designers
// @desc    Get all active designers for the public client-side gallery view
// @access  Public
router.get("/", async (req, res) => {
  try {
    const designers = await Designer.find({}).sort({ createdAt: -1 });
    res.status(200).json(designers);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching designer profiles", error: error.message });
  }
});

module.exports = router;