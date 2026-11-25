const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { submitContact, getContacts, markRead } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Rate limit contact form — max 5 submissions per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many messages sent. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public
router.post('/', contactLimiter, submitContact);

// Admin only
router.get('/', protect, adminOnly, getContacts);
router.patch('/:id/read', protect, adminOnly, markRead);

module.exports = router;
