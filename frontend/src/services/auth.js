import api from './api';

// Auth
export const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

export const register = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password });
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await api.get('/auth/me');
  return res.data;
};

// 🔹 Forgot Password
export const forgotPassword = async (email) => {
  const res = await api.post('/auth/forgot-password', { email });
  return res.data; // returns { message: 'If that email exists, a reset link has been sent' }
};

// 🔹 Reset Password
export const resetPassword = async (token, password) => {
  const res = await api.post(`/auth/reset-password/${token}`, { password });
  return res.data; // returns { message: 'Password reset successful' }
};

// Patients
export const getPatients = async () => {
  const res = await api.get('/patients');
  return res.data;
};

export const getPatient = async (id) => {
  const res = await api.get(`/patients/${id}`);
  return res.data;
};

export const createPatient = async (patientData) => {
  const res = await api.post('/patients', patientData);
  return res.data;
};

export const updatePatient = async (id, patientData) => {
  const res = await api.put(`/patients/${id}`, patientData);
  return res.data;
};

export const deletePatient = async (id) => {
  const res = await api.delete(`/patients/${id}`);
  return res.data;
};

// Symptoms
export const createSymptomQuery = async (queryData) => {
  const res = await api.post('/symptoms', queryData);
  return res.data;
};

export const getSymptomQueries = async () => {
  const res = await api.get('/symptoms');
  return res.data;
};

export const getPatientSymptomHistory = async (patientId) => {
  const res = await api.get(`/symptoms/patient/${patientId}`);
  return res.data;
};
