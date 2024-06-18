const User = require('../models/User');

const register = async (req, res) => {
  const { email, password } = req.body;
  try {
      const newUser = new User({ email, password });
      await newUser.save();
      res.status(201).json({ message: 'User created' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUser, register };
