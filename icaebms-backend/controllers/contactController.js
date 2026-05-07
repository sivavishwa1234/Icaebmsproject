const ContactMessage = require('../models/ContactMessage');

// @desc    Send a contact message
// @route   POST /api/contact/send
// @access  Public
const sendContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendContactMessage,
  getContactMessages
};
