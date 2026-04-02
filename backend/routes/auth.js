const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, getMe } = require('../controllers/authController');
const auth = require('../middleware/auth');
const { body } = require('express-validator');

// Public routes
router.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 4 }),
    register
);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword); // Public

// Protected route
router.get('/me', auth, getMe);

module.exports = router;
