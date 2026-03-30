import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { getPatients, createPatient, deletePatient } from '../services/auth';
import './PatientsPage.css';

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    contactNumber: '',
    email: '',
    address: ''
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
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPatient(formData);
      setShowForm(false);
      setFormData({
        name: '',
        age: '',
        gender: 'male',
        contactNumber: '',
        email: '',
        address: ''
      });
      fetchPatients();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(id);
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading patients...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="patients-page">
        <div className="page-header">
          <h1>Patients</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn btn-primary"
          >
            {showForm ? 'Cancel' : 'Add Patient'}
          </button>
        </div>

        {showForm && (
          <div className="card patient-form">
            <h2>Add New Patient</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Contact Number *</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Patient
              </button>
            </form>
          </div>
        )}

        <div className="patients-grid">
          {patients.length === 0 ? (
            <p>No patients found. Add your first patient!</p>
          ) : (
            patients.map((patient) => (
              <div key={patient._id} className="patient-card">
                <h3>{patient.name}</h3>
                <p><strong>Age:</strong> {patient.age}</p>
                <p><strong>Gender:</strong> {patient.gender}</p>
                <p><strong>Contact:</strong> {patient.contactNumber}</p>
                {patient.email && <p><strong>Email:</strong> {patient.email}</p>}
                <button
                  onClick={() => handleDelete(patient._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PatientsPage;
