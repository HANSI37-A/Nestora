const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Connect Database
connectDB();

// Base Route
app.get('/', (req, res) => {
  res.json({ message: 'Nestora API is running...' });
});

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});