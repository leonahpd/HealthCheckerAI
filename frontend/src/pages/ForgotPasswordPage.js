import React, { useState } from 'react';
import api from '../services/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      const res = await api.post('/auth/forgot-password', { email });
      // Backend returns a message, not the actual link
      setSuccess(res.data.message || 'If that email exists, a reset link has been sent.');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error || 'Something went wrong. Please try again later.'
      );
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ padding: 10, width: '100%' }}>
          Send Reset Link
        </button>
      </form>

      {success && <p style={{ color: 'green', marginTop: 10 }}>{success}</p>}
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </div>
  );
};

export default ForgotPasswordPage;
