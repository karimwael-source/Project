const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Lesson schema
const LessonSchema = new Schema({
  level: {
    type: String,
    enum: ['beginner', 'mediator', 'professional', 'star'],
    required: true,
  },
  lessonNumber: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,  // URL to the video for the lesson (can be hosted locally or externally)
    required: false,
  },
  videoTitle: {
    type: String,
    required: false,
  },
  videoDescription: {
    type: String,
    required: false,
  },
  isTest: {
    type: Boolean,
    default: false,  // Whether the lesson is a test or a regular lesson
  },
  duration: {
    type: Number,  // Duration of the lesson in minutes
    required: false,
  },
});

// Create and export the Lesson model
const Lesson = mongoose.model('Lesson', LessonSchema);
module.exports = Lesson;
