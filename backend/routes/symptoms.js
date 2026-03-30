const express = require('express');
const router = express.Router();
const symptomController = require('../controllers/symptomController');
const authMiddleware = require('../middleware/auth');

// --------------------
// Routes for Symptoms
// --------------------

// Create a new symptom query
router.post('/', authMiddleware, symptomController.createSymptomQuery);

// Get patient symptom history (more specific route first!)
router.get('/history/:patientId', authMiddleware, symptomController.getPatientSymptomHistory);

// Get a single symptom query by ID
router.get('/:id', authMiddleware, symptomController.getSymptomQuery);

// Get all symptom queries for the logged-in user
router.get('/', authMiddleware, symptomController.getAllSymptomQueries);

module.exports = router;
