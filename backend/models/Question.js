const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  language: { type: String, required: true },
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctOption: { type: Number, required: true },
  explanation: { type: String }
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
