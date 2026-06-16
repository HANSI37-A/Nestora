const express = require('express');
const multer = require('multer');
const path = require('path');
const { Readable } = require('stream');
const Designer = require('../models/Designer');
const { protect, admin } = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, 
  },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.webp') {
      cb(null, true);
    } else {
      cb(new Error('Only system image formats (.jpg, .jpeg, .png, .webp) are allowed'));
    }
  },
});

// @route   GET /api/admin/designers
// @desc    Get all designers for administration listing table
router.get("/", protect, admin, async (req, res) => {
  try {
    const designers = await Designer.find({}).sort({ createdAt: -1 });
    return res.status(200).json(designers);
  } catch (error) {
    console.error("Error fetching administrative directory:", error);
    return res.status(500).json({ message: "Server error fetching administrative directory list" });
  }
});

// @route   POST /api/admin/designers
// @desc    Create a new designer entry profile
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

    const designer = new Designer({ name, role, email, image, description });
    const createdDesigner = await designer.save();
    return res.status(201).json(createdDesigner);
  } catch (error) {
    console.error("Error creating designer:", error);
    return res.status(400).json({ message: "Invalid designer configuration data provided" });
  }
});

// @route   GET /api/admin/designers/:id
// @desc    Get a specific designer profile by ID
router.get("/:id", protect, admin, async (req, res) => {
  try {
    const designer = await Designer.findById(req.params.id);
    if (!designer) {
      return res.status(404).json({ message: "Designer record not found" });
    }
    return res.status(200).json(designer);
  } catch (error) {
    console.error("Error fetching designer id:", error);
    return res.status(500).json({ message: "Server error fetching designer details" });
  }
});

// @route   PUT /api/admin/designers/:id
// @desc    Modify an existing designer item document registry
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { name, role, email, image, description } = req.body;
    const designer = await Designer.findById(req.params.id);

    if (!designer) {
      return res.status(404).json({ message: "Designer record not found" });
    }

    designer.name = name || designer.name;
    designer.role = role || designer.role;
    designer.email = email || designer.email;
    designer.image = image || designer.image;
    designer.description = description || designer.description;

    const updatedDesigner = await designer.save();
    return res.status(200).json(updatedDesigner);
  } catch (error) {
    console.error("Error updating designer:", error);
    return res.status(500).json({ message: "Error modifying designer document payload" });
  }
});

// @route   DELETE /api/admin/designers/:id
// @desc    Remove a designer record permanently from the database directory
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const designer = await Designer.findById(req.params.id);
    if (!designer) {
      return res.status(404).json({ message: "Designer record item not found" });
    }
    await designer.deleteOne();
    return res.status(200).json({ message: "Designer document removed safely from directory layout" });
  } catch (error) {
    console.error("Error deleting designer:", error);
    return res.status(500).json({ message: "Server error executing document removal" });
  }
});

// @route   POST /api/admin/designers/upload
// @desc     directory folder path
// @access  Private/Admin
router.post("/upload", protect, admin, uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file binary provided." });
    }

    const uploadToCloudinary = () => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'nestora/designers', 
          resource_type: 'image',
          overwrite: true,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      Readable.from(req.file.buffer).pipe(stream);
    });

    const result = await uploadToCloudinary();
    return res.json({
      message: "Image streamed successfully to Cloudinary.",
      imageUrl: result.secure_url, 
    });

  } catch (error) {
    console.error("Error inside Cloudinary streaming pipeline:", error);
    return res.status(500).json({ message: error.message || "Server Error during streaming upload processing." });
  }
});

module.exports = router;