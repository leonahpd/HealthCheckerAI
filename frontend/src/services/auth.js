import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', { name, email, password });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const getPatients = async () => {
  const response = await api.get('/patients');
  return response.data;
};

export const getPatient = async (id) => {
  const response = await api.get(`/patients/${id}`);
  return response.data;
};

export const createPatient = async (patientData) => {
  const response = await api.post('/patients', patientData);
  return response.data;
};

export const updatePatient = async (id, patientData) => {
  const response = await api.put(`/patients/${id}`, patientData);
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await api.delete(`/patients/${id}`);
  return response.data;
};

export const createSymptomQuery = async (queryData) => {
  const response = await api.post('/symptoms', queryData);
  return response.data;
};

export const getSymptomQueries = async () => {
  const response = await api.get('/symptoms');
  return response.data;
};

export const getPatientSymptomHistory = async (patientId) => {
  const response = await api.get(`/symptoms/patient/${patientId}`);
  return response.data;
};
