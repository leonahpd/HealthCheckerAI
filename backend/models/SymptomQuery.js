const mongoose = require('mongoose');

const symptomQuerySchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  symptoms: [{
    type: String,
    required: true
  }],
  duration: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['mild', 'moderate', 'severe'],
    required: true
  },
  aiResponse: {
    possibleConditions: [
      {
        disease: String,
        confidence: Number,
        suggestion: String
      }
    ],
    recommendations: [String],
    urgencyLevel: String,
    disclaimer: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SymptomQuery', symptomQuerySchema);
