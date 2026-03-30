import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { getPatients, createSymptomQuery } from '../services/auth';
import './SymptomCheckerPage.css';

const SymptomCheckerPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    patientId: '',
    symptoms: '',
    duration: '',
    severity: 'mild'
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getPatients();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const symptomsArray = formData.symptoms.split(',').map(s => s.trim());
      const queryData = {
        ...formData,
        symptoms: symptomsArray
      };

      const response = await createSymptomQuery(queryData);
      setResult(response.aiResponse);
      
      // Reset form
      setFormData({
        patientId: '',
        symptoms: '',
        duration: '',
        severity: 'mild'
      });
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      alert('Error analyzing symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="symptom-checker-page">
        <h1>Symptom Checker</h1>

        <div className="symptom-form-container card">
          <h2>Enter Symptoms</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Select Patient *</label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a patient --</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name} ({patient.age}y, {patient.gender})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Symptoms * (comma-separated)</label>
              <textarea
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                placeholder="e.g., fever, headache, cough"
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>Duration *</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 3 days, 1 week"
                required
              />
            </div>

            <div className="form-group">
              <label>Severity *</label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
                required
              >
                <option value="mild">Mild</option>
                <option value="moderate">Moderate</option>
                <option value="severe">Severe</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>
          </form>
        </div>

        {result && (
          <div className="results-container card">
            <h2>Analysis Results</h2>
            
            <div className="result-section">
              <h3>Possible Conditions</h3>
              <ul>
                {result.possibleConditions.map((condition, index) => (
                  <li key={index}>{condition}</li>
                ))}
              </ul>
            </div>

            <div className="result-section">
              <h3>Recommendations</h3>
              <ul>
                {result.recommendations.map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>

            <div className="result-section">
              <h3>Urgency Level</h3>
              <p className={`urgency urgency-${result.urgencyLevel}`}>
                {result.urgencyLevel.toUpperCase()}
              </p>
            </div>

            <div className="disclaimer">
              <strong>Disclaimer:</strong> {result.disclaimer}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SymptomCheckerPage;
