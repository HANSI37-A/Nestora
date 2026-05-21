const express = require('express');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user data missing' });
    }

    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      color,
      colors,
      sizes,
      size,
      collection,
      collections,
      material,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      rating,      
      numReviews, 
      metaTitle,
      metaDescription,
      metaKeywords
    } = req.body;   

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      color: colors || color,
      sizes: sizes || size,
      productCollection: collection || collections,
      material,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      rating,
      numReviews,
      metaTitle,
      metaDescription,
      metaKeywords,
      user: req.user._id, 
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);

  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;