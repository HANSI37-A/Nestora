const express = require("express");
const Product = require("../models/Product");
const { Protect, admin, protect } =require("../middleware/authMiddleware");

const router = express.Router();

//@Route GET /api/admin/products
// @desc Get all products (admin only)
// @access Private /Admin
router.get("/", protect, admin, async (req, res) => {
  try{
    const products= await Product.find({});
    res.json(products);
  } catch (error){
    console.error(error);
    res.status(500).json({message: "Server Error"});
  }
});

module.exports = router;