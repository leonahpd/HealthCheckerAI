import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Health Checker - AI</h1>
        <nav className="nav">
          <Link
            to="/dashboard"
            className={location.pathname === '/dashboard' ? 'active' : ''}
          >
            Dashboard
          </Link>
          <Link
            to="/patients"
            className={location.pathname === '/patients' ? 'active' : ''}
          >
            Patients
          </Link>
          <Link
            to="/symptom-checker"
            className={location.pathname === '/symptom-checker' ? 'active' : ''}
          >
            Symptom Checker
          </Link>
        </nav>
        <div className="user-menu">
          <span>{user?.name}</span>
          <button onClick={logout} className="btn btn-secondary">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
