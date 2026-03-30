const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const patientController = require('../controllers/patientController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Get all patients
router.get('/', patientController.getAllPatients);

// Get single patient
router.get('/:id', patientController.getPatient);

// Create patient
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 0, max: 150 }).withMessage('Valid age is required'),
  body('gender').isIn(['male', 'female', 'other']).withMessage('Valid gender is required'),
  body('contactNumber').trim().notEmpty().withMessage('Contact number is required')
], patientController.createPatient);

// Update patient
router.put('/:id', patientController.updatePatient);

// Delete patient
router.delete('/:id', patientController.deletePatient);

module.exports = router;
