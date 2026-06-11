const express = require("express");
const router = express.Router();
const Designer = require("../models/designer");
const { protect, admin } = require("../middleware/authMiddleware"); 

// @route   GET /api/designers
// @desc    Get all designers for the public Heritage gallery view
router.get("/", async (req, res) => {
  try {
    const designers = await Designer.find({}).sort({ createdAt: -1 });
    res.status(200).json(designers);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching designer profiles" });
  }
});

// @route   POST /api/designers
// @desc    Create a new designer profile entry
router.post("/", protect, admin, async (req, res) => {
  const { role, name, image, description } = req.body;
  try {
    const designer = await Designer.create({ role, name, image, description });
    res.status(201).json(designer);
  } catch (error) {
    res.status(400).json({ message: "Invalid designer data provided" });
  }
});

// @route   PUT /api/designers/:id
// @desc    Modify an existing designer's information details
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const designer = await Designer.findById(req.params.id);
    if (!designer) return res.status(404).json({ message: "Designer record not found" });

    designer.role = req.body.role || designer.role;
    designer.name = req.body.name || designer.name;
    designer.image = req.body.image || designer.image;
    designer.description = req.body.description || designer.description;

    const updatedDesigner = await designer.save();
    res.status(200).json(updatedDesigner);
  } catch (error) {
    res.status(500).json({ message: "Error updating designer document registry" });
  }
});

module.exports = router;