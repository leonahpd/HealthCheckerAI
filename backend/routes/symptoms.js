const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const symptomController = require('../controllers/symptomController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// Create symptom query
router.post('/', [
  body('patientId').notEmpty().withMessage('Patient ID is required'),
  body('symptoms').isArray({ min: 1 }).withMessage('At least one symptom is required'),
  body('duration').trim().notEmpty().withMessage('Duration is required'),
  body('severity').isIn(['mild', 'moderate', 'severe']).withMessage('Valid severity is required')
], symptomController.createSymptomQuery);

// Get all symptom queries
router.get('/', symptomController.getAllSymptomQueries);

// Get single symptom query
router.get('/:id', symptomController.getSymptomQuery);

// Get patient symptom history
router.get('/patient/:patientId', symptomController.getPatientSymptomHistory);

module.exports = router;
