const express = require('express');
const router = express.Router();
const { loginAdmin, getMe, updateCredentials } = require('../controllers/authController');
const { protectAdmin } = require('../middleware/authMiddleware');
const { loginLimiter } = require('../middleware/rateLimiter');

router.post('/login', loginLimiter, loginAdmin);
router.get('/me', protectAdmin, getMe);
router.put('/credentials', protectAdmin, updateCredentials);

module.exports = router;
