import React, { useState } from 'react';
import api from '../services/api';
import './ForgotPasswordPage.css';
import { toast } from 'react-toastify';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error('Please enter your email');
    }

    setLoading(true);

    try {
      const res = await api.post('/auth/forgot-password', { email });

      toast.success(res.data.message || 'Reset link sent!');
      startCooldown();

    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const startCooldown = () => {
    let time = 30; // 30 seconds
    setCooldown(time);

    const interval = setInterval(() => {
      time--;
      setCooldown(time);

      if (time <= 0) clearInterval(interval);
    }, 1000);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h2>🔐 Forgot Password</h2>
        <p>Enter your email to receive a reset link</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon">✉️</span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading || cooldown > 0}>
            {loading
              ? 'Sending...'
              : cooldown > 0
              ? `Resend in ${cooldown}s`
              : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
