const mongoose = require('mongoose');
const dns = require('dns');


dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    console.log('Using existing cached database connection instance.');
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {

      maxPoolSize: 10, 
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

module.exports = connectDB;