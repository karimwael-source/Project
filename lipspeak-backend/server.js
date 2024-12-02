const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');  // Import routes for users
const lessonRoutes = require('./routes/lessons');  // Import routes for lessons

dotenv.config();  // Load environment variables

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Set up Express app
const app = express();
app.use(express.json());  // Middleware to parse JSON requests

// Use routes for users and lessons
app.use('/api/users', userRoutes);
app.use('/api/lessons', lessonRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
