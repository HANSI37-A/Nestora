const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   POST /api/products
// @desc    Create a new product
// @access  Private (Admin only)
router.post('/', protect, admin, async (req, res) => {
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

// @route PUT / api /products/:id
// @desc Update an existing product ID
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) =>{
  try{
    
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

    // Find product by ID
    const product = await Product.findById(req.params.id);

    if(product) {
      //Update product fields
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.color = color || product.color;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.images = images || product.images;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      // Save the updated product
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({message: "Product not found"});
    }
  } catch (error) {
       console.error(error);
      res.status(500).send("Server Error");
  }
});

// @route DELETE / api /products/ :id
// @desec Delete a product by Id
// @access Private/ Admin

router.delete("/:id", protect, admin, async (req, res) => {
  try{
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    if(product) {
      //Remove the product from DB
      await product.deleteOne();
      res.json({ message: "Product removed"});      
    } else {
      res.status(404).json({ message: "Product Removed"});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error");
  }
});

module.exports = router;