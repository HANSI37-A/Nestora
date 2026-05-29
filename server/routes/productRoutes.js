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
      product.color = colors || color || product.color;
      product.sizes = sizes || size || product.sizes;
      product.productCollection = collection || collections || product.productCollection;
      product.material = material || product.material;
      product.images = images || product.images;
      product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
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

// @route GET /api/products/type/best-seller
//@desc Petrive the product with hightest rating
//@access Public
router.get("/best-seller", async (req, res) =>{
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1});
    if(bestSeller){
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller found"});
    }
    
  } catch (error){
    console.error(error);
    res.status(500).send("Server Error");
  }
} );

// @route GET /api/products/new-arrivals
// @desc Retrieve latest 8 products - Creation data
// @access Public
router.get("/new-arrivals", async (req, res) =>{
  try{
    //Fetch latest 8 products
    const newArrivals = await Product.find()
    .sort({ createdAt: -1})
    .limit(8);
    res.json(newArrivals);
  } catch (error){
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET / api /products
// @desc Get all products
// @access Public
router.get("/", async (req, res) => {
  try {
    const {
      collection, color, minPrice, maxPrice, sortBy,search, category, material, brand, limit,
    } = req.query;

    let query = {};

    if(collection && collection.toLocaleLowerCase() !== "all") {
      query.productCollection = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material && material.toLocaleLowerCase() !== "all") {
      query.material = { $in: material.split(",")};
    }
    if (brand && brand.toLocaleLowerCase() !== "all") {
      query.brand =  { $in: brand.split(",")};
    }
    if (color && color.toLocaleLowerCase() !== "all") {
      query.color = { $in: color.split(",")};
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice)        query.price.$gte = Number(minPrice);
      if (maxPrice)        query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];   
    }
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "PriceAsc":
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "PriceDesc":
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // Fetch product and apply sorting and limit
    let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
    res.json(products);
  }  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error"});
        }

});

// @route GET /api/products/similar/:id
// @secs Retrieve similar products based on the current product's gender and category
// @access Public
router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;

  try{
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message:"Product Not Found"});
    }
    const similarProducts = await Product.find({
      _id: { $ne: id },
      category: product.category,
    }).limit(4);

    res.json(similarProducts);

  } catch (error){
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/products/ :id
// @desc Get a single product by ID
// @access Public

router.get("/:id", async (req, res) =>{
  try{
    const product = await Product.findById(req.params.id);
    if(product){
      res.json(product);
    } else {
      res.status(404).json({ message: "Product Not Found"});
    }
  } catch (error){
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
