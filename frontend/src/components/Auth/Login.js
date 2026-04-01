import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-hero">
        <div className="brand-pill">Health Checker - AI</div>
        <h1>Smarter symptom insights, faster care.</h1>
        <p className="hero-sub">
          Secure patient workspace with AI-assisted assessments, activity tracking, and streamlined intake.
        </p>
        <div className="hero-bullets">
          <div><span className="dot" /> AI-guided symptom summaries</div>
          <div><span className="dot" /> Patient management and history</div>
          <div><span className="dot" /> Privacy-first, JWT secured API</div>
        </div>
        <div className="hero-meta">
          <span className="meta-pill">Live • Connected</span>
          <span className="meta-pill">MongoDB & JWT</span>
          <span className="meta-pill">Hugging Face LLM</span>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>Welcome back</h2>
            <p>Log in to continue to your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* ✅ Forgot Password Link */}
            <div className="forgot-password">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            {error && <div className="error">{error}</div>}

            <button type="submit" className="btn btn-primary full">
              Login
            </button>
          </form>

          <p className="auth-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
