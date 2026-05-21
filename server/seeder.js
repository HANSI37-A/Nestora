const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Products = require('./data/products');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    const createdUser = await User.create({
      name: 'Admin User',
      email: 'admin@gmaill.com',
      password: '123456',
      role: 'admin'
    });
  } catch (error) {}

};