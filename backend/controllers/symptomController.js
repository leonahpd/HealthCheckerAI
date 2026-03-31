const SymptomQuery = require('../models/SymptomQuery');
const Patient = require('../models/Patient');
const aiService = require('../utils/aiService'); // updated Router API service
const { validationResult } = require('express-validator');

// Create symptom query
exports.createSymptomQuery = async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { patientId, symptoms, duration, severity } = req.body;

    // Verify patient exists and belongs to the user
    const patient = await Patient.findOne({
      _id: patientId,
      createdBy: req.user._id
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Call AI service to analyze symptoms
    let aiResponse;
    try {
      aiResponse = await aiService.analyzeSymptoms({
        symptoms,
        duration,
        severity,
        age: patient.age,
        gender: patient.gender
      });

      // Ensure structured response (fallback)
      if (
        !aiResponse ||
        !Array.isArray(aiResponse.possibleConditions) ||
        !Array.isArray(aiResponse.recommendations) ||
        !aiResponse.urgencyLevel
      ) {
        aiResponse = {
          possibleConditions: [],
          recommendations: [],
          urgencyLevel: 'unknown',
          disclaimer: 'AI could not provide an analysis.'
        };
      }

    } catch (aiError) {
      console.error('AI service error:', aiError.message);
      aiResponse = {
        possibleConditions: [],
        recommendations: [],
        urgencyLevel: 'unknown',
        disclaimer: 'AI analysis failed. Please try again later.'
      };
    }

    // Save symptom query in DB
    const symptomQuery = await SymptomQuery.create({
      patientId,
      symptoms,
      duration,
      severity,
      aiResponse,
      createdBy: req.user._id
    });

    // Return structured result to frontend
    res.status(201).json({
      id: symptomQuery._id,
      patientId: symptomQuery.patientId,
      symptoms: symptomQuery.symptoms,
      duration: symptomQuery.duration,
      severity: symptomQuery.severity,
      aiResponse: symptomQuery.aiResponse,
      createdAt: symptomQuery.createdAt
    });

  } catch (error) {
    console.error('Symptom query creation error:', error.message);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};

// Optional: Implement additional GET routes if missing
exports.getSymptomQuery = async (req, res) => {
  const query = await SymptomQuery.findById(req.params.id);
  if (!query) return res.status(404).json({ error: 'Query not found' });
  res.json(query);
};

exports.getAllSymptomQueries = async (req, res) => {
  const queries = await SymptomQuery.find({ createdBy: req.user._id });
  res.json(queries);
};

exports.getPatientSymptomHistory = async (req, res) => {
  const queries = await SymptomQuery.find({ patientId: req.params.patientId });
  res.json(queries);
};
