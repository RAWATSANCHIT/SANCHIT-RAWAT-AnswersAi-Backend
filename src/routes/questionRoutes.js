const express = require('express');
const { askQuestion, getQuestion, getUserQuestions } = require('../controllers/questionController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, askQuestion);
router.get('/:questionId', authMiddleware, getQuestion);
router.get('/user/:userId', authMiddleware, getUserQuestions);

module.exports = router;
