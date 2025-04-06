// src/models/admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {  // Changed from email to username
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['Super Admin', 'Product Manager', 'Tech Manager'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Admin', adminSchema);