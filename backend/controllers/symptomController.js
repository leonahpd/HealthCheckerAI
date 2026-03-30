const SymptomQuery = require('../models/SymptomQuery');
const Patient = require('../models/Patient');
const aiService = require('../utils/aiService');
const { validationResult } = require('express-validator');

// Create symptom query
exports.createSymptomQuery = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { patientId, symptoms, duration, severity } = req.body;
    const patient = await Patient.findOne({ _id: patientId, createdBy: req.user._id });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    let aiResponse;
    try {
      aiResponse = await aiService.analyzeSymptoms({ symptoms, duration, severity, age: patient.age, gender: patient.gender });
      if (!aiResponse || !Array.isArray(aiResponse.possibleConditions)) {
        aiResponse = { possibleConditions: [], recommendations: [], urgencyLevel: 'unknown', disclaimer: 'AI could not provide an analysis.' };
      }
    } catch (err) {
      console.error('AI service error:', err.message);
      aiResponse = { possibleConditions: [], recommendations: [], urgencyLevel: 'unknown', disclaimer: 'AI analysis failed.' };
    }

    const symptomQuery = await SymptomQuery.create({ patientId, symptoms, duration, severity, aiResponse, createdBy: req.user._id });
    res.status(201).json(symptomQuery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all symptom queries for logged-in user
exports.getAllSymptomQueries = async (req, res) => {
  try {
    const queries = await SymptomQuery.find({ createdBy: req.user._id })
      .populate('patientId', 'name age gender')
      .sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get a single symptom query by ID
exports.getSymptomQuery = async (req, res) => {
  try {
    const query = await SymptomQuery.findOne({ _id: req.params.id, createdBy: req.user._id }).populate('patientId');
    if (!query) return res.status(404).json({ error: 'Symptom query not found' });
    res.json(query);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get patient symptom history
exports.getPatientSymptomHistory = async (req, res) => {
  try {
    const queries = await SymptomQuery.find({ patientId: req.params.patientId, createdBy: req.user._id }).sort({ createdAt: -1 });
    res.json(queries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
