const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', QuestionSchema);
