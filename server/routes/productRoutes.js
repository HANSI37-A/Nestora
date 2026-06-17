const express = require('express');
const multer = require('multer');
const path = require('path');
const { Readable } = require('stream');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

const uploadModel = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
  fileFilter(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.glb' || ext === '.gltf') {
      cb(null, true);
    } else {
      cb(new Error('Only .glb or .gltf files allowed'));
    }
  },
});

router.get("/best-seller", async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      return res.json(bestSeller);
    } else {
      return res.status(404).json({ message: "No best seller found" });
    }
  } catch (error) {
    console.error("Error in /best-seller:", error);
    return res.status(500).send("Server Error");
  }
});

router.get("/new-arrivals", async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);
    return res.json({ data: newArrivals });
  } catch (error) {
    console.error("Error in /new-arrivals:", error);
    return res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const {
      collection, color, minPrice, maxPrice, sortBy, search,
      category, material, brand, size, sizes, limit,
    } = req.query;

    const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const buildRegex = (value) => {
      const stringValue = Array.isArray(value) ? value.join(',') : String(value || '');
      const tokens = stringValue.split(',').map((item) => item.trim()).filter(Boolean).map(escapeRegex);
      if (!tokens.length) return null;
      return new RegExp(tokens.join('|'), 'i');
    };

    let query = {};

    if (collection && String(collection).toLowerCase() !== "all") {
      const regex = buildRegex(collection);
      if (regex) query.productCollection = regex;
    }
    if (category && String(category).toLowerCase() !== "all") {
      const regex = buildRegex(category);
      if (regex) query.category = regex;
    }
    if (material && String(material).toLowerCase() !== "all") {
      const regex = buildRegex(material);
      if (regex) query.material = regex;
    }
    if (brand && String(brand).toLowerCase() !== "all") {
      const regex = buildRegex(brand);
      if (regex) query.brand = regex;
    }
    if (color && String(color).toLowerCase() !== "all") {
      const regex = buildRegex(color);
      if (regex) query.color = regex;
    }

    const targetSize = size || sizes;
    if (targetSize && String(targetSize).toLowerCase() !== "all") {
      const regex = buildRegex(targetSize);
      if (regex) query.sizes = regex;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
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

    const products = await Product.find(query).sort(sort).limit(Number(limit) || 0);
    return res.json({ data: products });
  } catch (error) {
    console.error("Error in / main filter route:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized, user data missing' });
    }
    const {
      name, description, price, discountPrice, countInStock, sku,
      category, brand, color, colors, sizes, size, collection,
      collections, material, images, isFeatured, isPublished,
      tags, dimensions, weight, rating, numReviews, metaTitle,
      metaDescription, metaKeywords
    } = req.body;

    const product = new Product({
      name, description, price, discountPrice, countInStock, sku,
      category, brand,
      color: colors || color,
      sizes: sizes || size,
      productCollection: collection || collections,
      material, images, isFeatured, isPublished, tags, dimensions,
      weight, rating, numReviews, metaTitle, metaDescription, metaKeywords,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    return res.status(201).json(createdProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: 'Server error' });
  }
});

router.get("/similar/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    const similarProducts = await Product.find({
      _id: { $ne: id },
      category: product.category,
    }).limit(4);
    return res.json({ data: similarProducts });
  } catch (error) {
    console.error("Error in /similar/:id:", error);
    return res.status(500).send("Server Error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error("Error in GET /:id:", error);
    return res.status(500).send("Server Error");
  }
});

router.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name, description, price, discountPrice, countInStock, sku,
      category, brand, color, colors, sizes, size, collection,
      collections, material, images, isFeatured, isPublished,
      tags, dimensions, weight, rating, numReviews, metaTitle,
      metaDescription, metaKeywords
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
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

      const updatedProduct = await product.save();
      return res.json(updatedProduct);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error in PUT /:id:", error);
    return res.status(500).send("Server Error");
  }
});

router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      return res.json({ message: "Product removed" });
    } else {
      return res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.error("Error in DELETE /:id:", error);
    return res.status(500).json("Server Error");
  }
});

router.post("/:id/upload-model", protect, admin, uploadModel.single('model'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No model file provided." });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    const uploadToCloudinary = () => new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'nestora/models',
          resource_type: 'raw',
          public_id: `model-${req.params.id}`,
          overwrite: true,
          chunk_size: 6000000,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      Readable.from(req.file.buffer).pipe(stream);
    });

    const result = await uploadToCloudinary();
    product.modelUrl = result.secure_url;
    await product.save();

    return res.json({
      message: "Model uploaded successfully.",
      modelUrl: result.secure_url,
    });

  } catch (error) {
    console.error("Error uploading model:", error);
    return res.status(500).json({ message: error.message || "Server Error during upload." });
  }
});

module.exports = router;