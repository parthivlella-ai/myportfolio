const rateLimit = require('express-rate-limit');

// Rate limiter for contact message submissions (max 5 requests per 15 mins per IP)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Too many messages sent from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for admin login attempts (max 10 requests per 15 mins per IP)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many login attempts from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { contactLimiter, loginLimiter };
