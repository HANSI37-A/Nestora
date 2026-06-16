const express = require("express");
const router = express.Router();
const Designer = require("../models/Designer");
const { protect, admin } = require("../middleware/authMiddleware");

// @route   GET /api/admin/designers
// @desc    Get all designers for administration listing table
// @access  Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const designers = await Designer.find({}).sort({ createdAt: -1 });
    res.status(200).json(designers);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching administrative directory list" });
  }
});

// @route   POST /api/admin/designers
// @desc    Create a new designer entry profile
// @access  Private/Admin
router.post("/", protect, admin, async (req, res) => {
  const { name, role, email, image, description } = req.body;
  
  if (!name || !role || !email || !image || !description) {
    return res.status(400).json({ message: "All profile properties are required" });
  }

  try {
    const designerExists = await Designer.findOne({ email });
    if (designerExists) {
      return res.status(400).json({ message: "A designer profile registry with that email already exists" });
    }

    const designer = await Designer.create({ name, role, email, image, description });
    res.status(201).json(designer);
  } catch (error) {
    res.status(400).json({ message: "Invalid designer configuration data provided" });
  }
});

// @route   PUT /api/admin/designers/:id
// @desc    Modify an existing designer item document registry
// @access  Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const designer = await Designer.findById(req.params.id);
    if (!designer) return res.status(404).json({ message: "Designer record not found" });

    designer.name = req.body.name || designer.name;
    designer.role = req.body.role || designer.role;
    designer.email = req.body.email || designer.email;
    designer.image = req.body.image || designer.image;
    designer.description = req.body.description || designer.description;

    const updatedDesigner = await designer.save();
    res.status(200).json(updatedDesigner);
  } catch (error) {
    res.status(500).json({ message: "Error modifying designer document payload" });
  }
});

// @route   DELETE /api/admin/designers/:id
// @desc    Remove a designer record permanently from the database directory
// @access  Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const designer = await Designer.findByIdAndDelete(req.params.id);
    if (!designer) {
      return res.status(404).json({ message: "Designer record item not found" });
    }
    res.status(200).json({ message: "Designer document removed safely from directory layout" });
  } catch (error) {
    res.status(500).json({ message: "Server error executing document removal" });
  }
});

module.exports = router;