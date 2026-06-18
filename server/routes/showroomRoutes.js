const express = require("express");
const router = express.Router();
const Showroom = require("../models/Showroom");

// @route   GET /showrooms
// @desc    Get all active showrooms for the public grid view
// @access  Public
router.get("/", async (req, res) => {
  try {
    const showrooms = await Showroom.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ data: showrooms });
  } catch (error) {
    console.error(" Error fetching public showrooms:", error);
    return res.status(500).json({ 
      message: "Server error fetching showroom records", 
      error: error.message 
    });
  }
});

// @route   GET /showrooms/:id
// @desc    Get a single showroom's full profile details
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const showroom = await Showroom.findById(req.params.id);
    if (!showroom) {
      return res.status(404).json({ message: "Showroom spatial environment not found" });
    }
    return res.status(200).json(showroom);
  } catch (error) {
    console.error(` Error fetching public showroom ${req.params.id}:`, error);
    return res.status(500).json({ 
      message: "Server error resolving showroom profile structural layout", 
      error: error.message 
    });
  }
});

module.exports = router;