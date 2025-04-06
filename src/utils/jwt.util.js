// src/utils/jwt_util.js
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '1h', // Token expires in 1 hour
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
};

module.exports = { generateToken, verifyToken };