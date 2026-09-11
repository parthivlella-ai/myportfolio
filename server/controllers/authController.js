const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token helper
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'portfolio_super_secret_jwt_key_2026_change_in_production',
    { expiresIn: '30d' }
  );
};

// @desc    Admin login (by email or username)
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email/username and password' });
    }

    const inputVal = email.toLowerCase().trim();
    // Allow login by email OR username
    const user = await User.findOne({
      $or: [{ email: inputVal }, { username: inputVal }]
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private (Admin)
const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Admin credentials (Username, Email, Password)
// @route   PUT /api/auth/credentials
// @access  Private (Admin)
const updateCredentials = async (req, res) => {
  try {
    const { username, email, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (username) user.username = username.trim();
    if (email) user.email = email.toLowerCase().trim();
    if (newPassword && newPassword.length >= 6) {
      user.password = newPassword;
    }

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      message: 'Admin credentials updated successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { loginAdmin, getMe, updateCredentials };
