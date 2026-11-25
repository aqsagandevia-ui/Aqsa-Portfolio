const jwt = require('jsonwebtoken');

/**
 * Generates a signed JWT for a given user ID.
 * @param {string} id - MongoDB ObjectId
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

module.exports = generateToken;
