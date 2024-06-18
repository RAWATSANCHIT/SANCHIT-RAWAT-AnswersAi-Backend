const Question = require('../models/Question');
const aiService = require('../services/aiService');

const askQuestion = async (req, res) => {
  const { question } = req.body;
  const userId = req.user.userId;
  try {
    console.log('Inside function')
    console.log(req.body)
    console.log(question)
    const answer = await aiService.generateAnswer(question);
    console.log(answer)
    const newQuestion = new Question({ userId, question, answer });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuestion = async (req, res) => {
  const { questionId } = req.params;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserQuestions = async (req, res) => {
  const { userId } = req.params;
  try {
    const questions = await Question.find({ userId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { askQuestion, getQuestion, getUserQuestions };
