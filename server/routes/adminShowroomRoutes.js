const express = require('express');
const multer = require('multer');
const path = require('path');
const { Readable } = require('stream');
const Showroom = require('../models/Showroom');
const { protect, admin } = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// Configured standard memory storage buffer allocator for image files
const uploadImage = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 12 * 1024 * 1024, 
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

// @route   GET /api/admin/showrooms
// @desc    Get all showrooms for administration listing table
router.get("/", protect, admin, async (req, res) => {
  try {
    const showrooms = await Showroom.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ data: showrooms });
  } catch (error) {
    console.error("Error fetching administrative showroom directory:", error);
    return res.status(500).json({ message: "Server error fetching showroom records" });
  }
});

// @route   POST /api/admin/showrooms
// @desc    Create a new showroom showcase space
router.post("/", protect, admin, async (req, res) => {
  const { name, location, dimensions, image, description } = req.body;
  
  if (!name || !location || !dimensions || !image || !description) {
    return res.status(400).json({ message: "All spatial profile properties are required" });
  }

  try {
    const showroom = new Showroom({ name, location, dimensions, image, description });
    const createdShowroom = await showroom.save();
    return res.status(201).json(createdShowroom);
  } catch (error) {
    console.error("Error creating showroom document:", error);
    return res.status(400).json({ message: "Invalid showroom layout data configurations provided" });
  }
});

// @route   GET /api/admin/showrooms/:id
// @desc    Get a specific showroom profile by ID
router.get("/:id", protect, admin, async (req, res) => {
  try {
    const showroom = await Showroom.findById(req.params.id);
    if (!showroom) {
      return res.status(404).json({ message: "Showroom record space instance not found" });
    }
    return res.status(200).json(showroom);
  } catch (error) {
    console.error("Error fetching showroom by id instance:", error);
    return res.status(500).json({ message: "Server error fetching showroom details" });
  }
});

// @route   PUT /api/admin/showrooms/:id
// @desc    Modify an existing showroom document registry
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const { name, location, dimensions, image, description } = req.body;
    const showroom = await Showroom.findById(req.params.id);

    if (!showroom) {
      return res.status(404).json({ message: "Showroom structural space instance not found" });
    }

    showroom.name = name || showroom.name;
    showroom.location = location || showroom.location;
    showroom.dimensions = dimensions || showroom.dimensions;
    showroom.image = image || showroom.image;
    showroom.description = description || showroom.description;

    const updatedShowroom = await showroom.save();
    return res.status(200).json(updatedShowroom);
  } catch (error) {
    console.error("Error updating showroom parameters:", error);
    return res.status(500).json({ message: "Error modifying showroom document data layout" });
  }
});

// @route   DELETE /api/admin/showrooms/:id
// @desc    Remove a showroom record permanently from the database directory
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const showroom = await Showroom.findById(req.params.id);
    if (!showroom) {
      return res.status(404).json({ message: "Showroom structural item not found" });
    }
    await showroom.deleteOne();
    return res.status(200).json({ message: "Showroom space document removed safely from directory layout" });
  } catch (error) {
    console.error("Error deleting showroom instance:", error);
    return res.status(500).json({ message: "Server error executing document removal sequence" });
  }
});

// @route   POST /api/admin/showrooms/upload
// @desc    STREAM ENGINE: Streams architectural render to Cloudinary and force-creates 'nestora/showrooms'
router.post("/upload", protect, admin, uploadImage.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No showroom design asset binary provided." });
    }

    const uploadToCloudinary = () => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'nestora/showrooms',
          resource_type: 'image',
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Showroom Media Engine Failure:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      Readable.from(req.file.buffer).pipe(stream);
    });

    const result = await uploadToCloudinary();
    return res.json({
      message: "Showroom asset image safely streamed to Cloudinary core storage cluster.",
      imageUrl: result.secure_url,
    });

  } catch (error) {
    console.error(" CRITICAL: Showroom Upload Pipeline Crash:", error);
    return res.status(500).json({ 
      message: error.message || "Server Error encountered during streaming upload processing." 
    });
  }
});

module.exports = router;