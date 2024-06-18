const express = require('express');
const { getUser, register } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.get('/:userId', authMiddleware, getUser);

module.exports = router;
