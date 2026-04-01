const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Register
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], authController.register);

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], authController.login);

// 🔥 NEW: Forgot Password
router.post('/forgot-password', [
  body('email').isEmail().withMessage('Valid email is required')
], authController.forgotPassword);

// 🔥 NEW: Reset Password
router.post('/reset-password/:token', [
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
], authController.resetPassword);

// Get current user
router.get('/me', auth, authController.getMe);

module.exports = router;
