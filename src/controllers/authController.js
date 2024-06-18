const jwt = require('jsonwebtoken');
const User = require('../models/User');

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    res.json({ message: 'Logged out' });
};

const refresh = async (req, res) => {
    const refreshToken = req.header('x-refresh-token');
    if (!refreshToken) return res.status(401).json({ msg: 'Token not found, cannot be authorized.' });
    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
        const payload = { user: { id: decoded.user.id } };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(401).json({ msg: 'Invalid Token' });
    }
};

module.exports = {login, logout, refresh };
