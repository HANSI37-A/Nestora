const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Cart = require('./models/Cart');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Products = require('./data/products'); 

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected for seeding...'))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

const seedData = async () => {
  try {
    
    await User.deleteMany();
    await Product.deleteMany();
    await Cart.deleteMany();
    await Category.deleteMany();
    console.log('Old collections purged.');

    await Category.insertMany([
      { name: 'living room', description: 'Living room furniture', icon: 'BiHomeAlt' },
      { name: 'bedroom', description: 'Bedroom furniture', icon: 'BiBed' },
      { name: 'dining room', description: 'Dining room furniture', icon: 'BiChair' },
      { name: 'office', description: 'Office furniture', icon: 'BiBriefcase' },
      { name: 'decor', description: 'Home decor items', icon: 'BiCompass' }
    ]);
    console.log('Categories initialized.');


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
        category: product.category ? product.category.toLowerCase() : 'decor',
        color: product.colors || product.color,
        sizes: product.sizes || product.size,
        productCollection: (product.collections || product.collection || 'all').toLowerCase(),
        
        images: product.images ? product.images.map(img => ({
          url: img.url,
          altText: img.altText || img.alt || product.name,
          alt: img.alt || img.altText || product.name
        })) : [],

        isPublished: true,
        isFeatured: product.isFeatured !== undefined ? product.isFeatured : true
      };
    });

    await Product.insertMany(sampleProducts);
    console.log('Database successfully seeded with luxury Nestora items!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding database data structure:', error);
    process.exit(1);
  }
};

seedData();