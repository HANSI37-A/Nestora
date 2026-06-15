const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const router = express.Router(); 

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "nestora/products",
    resource_type: "image",
    allowed_formats: ["jpg", "png", "webp"],
  },
});

const uploadImage = multer({ storage: imageStorage });

router.post("/", uploadImage.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // req.file.path automatically holds the Cloudinary secure_url
    res.json({ imageUrl: req.file.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;