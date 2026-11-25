const Contact = require('../models/Contact');
const { sendContactEmail } = require('../services/emailService');

/**
 * POST /api/contact
 * Validate, save to DB, send email.
 */
const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      res.status(400);
      return next(new Error('All fields are required'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400);
      return next(new Error('Invalid email address'));
    }

    if (message.length > 2000) {
      res.status(400);
      return next(new Error('Message is too long (max 2000 characters)'));
    }

    // Save to database
    const contact = await Contact.create({ name, email, subject, message });

    // Send email (non-blocking — don't fail if email fails)
    try {
      await sendContactEmail({ name, email, subject, message });
    } catch (emailError) {
      console.error('Email sending failed (message still saved):', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been received. I will get back to you soon!',
      data: { id: contact._id },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/contact (Admin)
 * Get all contact submissions.
 */
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/contact/:id/read (Admin)
 * Mark message as read.
 */
const markRead = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!contact) {
      res.status(404);
      return next(new Error('Message not found'));
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitContact, getContacts, markRead };
