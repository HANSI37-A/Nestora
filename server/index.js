const dotenv = require('dotenv');
dotenv.config(); 

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); 
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const subscriberRoutes = require('./routes/subscriberRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const designerRoutes = require("./routes/designerRoutes");
const contactRoutes = require("./routes/contactRoutes");
const showroomRoutes = require("./routes/showroomRoutes");

const adminRoutes = require('./routes/adminRoutes');
const productAdminRoutes = require('./routes/productAdminRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const adminDesignerRoutes = require('./routes/adminDesignerRoutes');
const showroomAdminRoutes = require('./routes/adminShowroomRoutes');

const app = express();

app.use(cors({
   origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://furniture-nestorafront.vercel.app'
  
  ],
  credentials: true,               
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect Database
connectDB();

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Nestora API is running cleanly...' });
});

app.use('/admin/products', productAdminRoutes);
app.use('/admin/orders', adminOrderRoutes);
app.use('/admin/designers', adminDesignerRoutes); 
app.use('/admin/showrooms', showroomAdminRoutes);
app.use('/admin', adminRoutes);


app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/orders', orderRoutes);
app.use('/upload', uploadRoutes);
app.use('/subscribe', subscriberRoutes);
app.use('/categories', categoryRoutes);
app.use('/designers', designerRoutes); 
app.use('/contact', contactRoutes);
app.use('/showrooms', showroomRoutes);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;