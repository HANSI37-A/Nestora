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

const adminRoutes = require('./routes/adminRoutes');
const productAdminRoutes = require('./routes/productAdminRoutes');
const adminOrderRoutes = require('./routes/adminOrderRoutes');
const adminDesignerRoutes = require('./routes/adminDesignerRoutes');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
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

app.use('/api/admin/products', productAdminRoutes);
app.use('/api/admin/orders', adminOrderRoutes);
app.use('/api/admin/designers', adminDesignerRoutes); 
app.use('/api/admin', adminRoutes);


app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/subscribe', subscriberRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/designers', designerRoutes); 
app.use('/api/contact', contactRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});