const express = require('express');
const Lesson = require('../models/Lesson');  // Import the Lesson model
const router = express.Router();

// Route to fetch lessons by level
router.get('/:level', async (req, res) => {
  const { level } = req.params;

  try {
    const lessons = await Lesson.find({ level });
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lessons', error });
  }
});

// Route to fetch a specific lesson
router.get('/:level/:lessonNumber', async (req, res) => {
  const { level, lessonNumber } = req.params;

  try {
    const lesson = await Lesson.findOne({ level, lessonNumber });
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lesson', error });
  }
});

module.exports = router;
