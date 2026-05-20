const mongoose = require('mongoose');
const { collection } = require('./User');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  sku: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: [String],
    required: true,
  },
  collection: {
    type: String,
    required: true,
  },
  material: {
    type: String,
  },
   images: [
    {
      url: { type: String, required: true },
      alt: { type: String },
    },
  ],
  isFeatured: {
  type: Boolean,
  default: false,
}, 
 isPublished: {
  type: Boolean,
  default: false,
},
 rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  metaTitale: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaKeywords: {
    type: String,
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  weight: Number,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);