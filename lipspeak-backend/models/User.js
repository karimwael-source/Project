const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For hashing passwords
const Schema = mongoose.Schema;

// Define the User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'mediator', 'professional', 'star'],
    default: 'beginner',
  },
  lessonsCompleted: {
    type: [Schema.Types.ObjectId],  // Array of ObjectIds referring to lessons
    ref: 'Lesson',
    default: [],
  },
  testsPassed: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Create and export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
