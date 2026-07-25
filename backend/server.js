const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.warn('Warning: MongoDB failed to connect. Express server will run with offline/fallback mode. Error:', err.message);
  }
};

connectDB();

// Define Routes
app.use('/api/projects', require('./routes/projects'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
