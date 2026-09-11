const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContactMessages,
  markMessageAsRead,
  deleteContactMessage
} = require('../controllers/contactController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { contactLimiter } = require('../middleware/rateLimiter');

router.post('/', contactLimiter, submitContact);

// Protected Admin Routes
router.get('/', protectAdmin, getContactMessages);
router.put('/:id/read', protectAdmin, markMessageAsRead);
router.delete('/:id', protectAdmin, deleteContactMessage);

module.exports = router;
