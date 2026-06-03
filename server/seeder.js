const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Cart = require('./models/Cart')
const Product = require('./models/Product');
const Category = require('./models/Category');
const Products = require('./data/products');


dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();
    await Category.deleteMany();

    // Seed categories
    const categories = await Category.insertMany([
      { name: 'living room', description: 'Living room furniture', icon: 'BiHomeAlt' },
      { name: 'bedroom', description: 'Bedroom furniture', icon: 'BiBed' },
      { name: 'dining room', description: 'Dining room furniture', icon: 'BiChair' },
      { name: 'office', description: 'Office furniture', icon: 'BiBriefcase' },
      { name: 'decor', description: 'Home decor items', icon: 'BiCompass' }
    ]);

    const createdUser = await User.create({
      name: 'Admin User',
      email: 'admin@gmaill.com',
      password: '123456',
      role: 'admin'
    });

    const userID = createdUser._id;

    const sampleProducts = Products.map(product => {
      return {
        ...product,
        user: userID,
        color: product.colors || product.color,
        productCollection: product.collections || product.collection,
        images: product.images ? product.images.map(img => ({
          url: img.url,
          alt: img.alt || img.altText
        })) : []
      };
    });

    await Product.insertMany(sampleProducts);
    console.log('Data seeded successfully');
    process.exit();

  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }

};

seedData();