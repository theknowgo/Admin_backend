// src/controllers/authController.js
const Admin = require('../models/admin');
const { comparePassword } = require('../utils/bcrypt_util');
const { generateToken } = require('../utils/jwt_util');

const login = async (req, res) => {
  const { username, password } = req.body;  // Changed from email to username

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });  // Updated message
  }

  try {
    // Find admin by username
    const admin = await Admin.findOne({ username });  // Changed from email to username
    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });  // Updated message
    }

    // Compare password
    const isMatch = await comparePassword(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });  // Updated message
    }

    // Generate JWT token
    const token = generateToken({
      id: admin._id,
      username: admin.username,  // Changed from email to username
      role: admin.role,
    });

    // Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,  // Changed from email to username
        role: admin.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };