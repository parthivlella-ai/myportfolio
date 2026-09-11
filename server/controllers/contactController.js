const ContactMessage = require('../models/ContactMessage');

// @desc    Submit contact message (Public)
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    const newMsg = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject ? subject.trim() : 'Portfolio Inquiry',
      message: message.trim(),
      ipAddress
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been received successfully.'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private (Admin)
const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    const unreadCount = await ContactMessage.countDocuments({ isRead: false });

    res.json({
      success: true,
      count: messages.length,
      unreadCount,
      messages
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Mark contact message as read (Admin)
// @route   PUT /api/contact/:id/read
// @access  Private (Admin)
const markMessageAsRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    msg.isRead = true;
    await msg.save();

    res.json({
      success: true,
      message: 'Message marked as read',
      msg
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete contact message (Admin)
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContactMessage = async (req, res) => {
  try {
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    await ContactMessage.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Message deleted'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitContact,
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage
};
