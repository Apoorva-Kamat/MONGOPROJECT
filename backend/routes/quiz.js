const express = require('express');
const Question = require('../models/Question');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get questions by language
router.get('/:language', async (req, res) => {
  const { language } = req.params;
  try {
    const questions = await Question.find({ language });
    res.json(questions);
  } catch (error) {
    res.status(500).send('Error fetching questions');
  }
});

// Admin routes
router.use(authMiddleware);

router.post('/', async (req, res) => {
  const { language, questionText, options, correctOption, explanation } = req.body;
  try {
    const question = new Question({ language, questionText, options, correctOption, explanation });
    await question.save();
    res.status(201).send('Question added');
  } catch (error) {
    res.status(400).send('Error adding question');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { language, questionText, options, correctOption, explanation } = req.body;
  try {
    await Question.findByIdAndUpdate(id, { language, questionText, options, correctOption, explanation });
    res.send('Question updated');
  } catch (error) {
    res.status(400).send('Error updating question');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Question.findByIdAndDelete(id);
    res.send('Question deleted');
  } catch (error) {
    res.status(400).send('Error deleting question');
  }
});

module.exports = router;
