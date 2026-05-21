const Product = require('./models/Product');
const mongoose = require('mongoose');

const p = new Product({
  name: "Test Product",
  description: "Test Description",
  price: 100,
  countInStock: 10,
  sku: "TEST-SKU-ARRAY",
  category: "Test Category",
  brand: "Test Brand",
  color: [], // Empty array for required color field
  productCollection: "Test Collection",
  user: new mongoose.Types.ObjectId(),
});

const err = p.validateSync();
if (err) {
  console.error("Validation Error:", err.message);
} else {
  console.log("Validation Passed!");
}
process.exit(0);
