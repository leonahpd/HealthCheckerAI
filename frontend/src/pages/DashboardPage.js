import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { getPatients, getSymptomQueries } from '../services/auth';
import './DashboardPage.css';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalQueries: 0,
    recentQueries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patients, queries] = await Promise.all([
          getPatients(),
          getSymptomQueries()
        ]);

        setStats({
          totalPatients: patients.length,
          totalQueries: queries.length,
          recentQueries: queries.slice(0, 5)
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading dashboard...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="dashboard">
        <h1>Dashboard</h1>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Patients</h3>
            <p className="stat-number">{stats.totalPatients}</p>
          </div>
          <div className="stat-card">
            <h3>Total Symptom Queries</h3>
            <p className="stat-number">{stats.totalQueries}</p>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Symptom Checks</h2>
          {stats.recentQueries.length === 0 ? (
            <p>No recent activity</p>
          ) : (
            <div className="queries-list">
              {stats.recentQueries.map((query) => (
                <div key={query._id} className="query-item">
                  <div>
                    <strong>Patient:</strong> {query.patientId?.name || 'Unknown'}
                  </div>
                  <div>
                    <strong>Symptoms:</strong> {query.symptoms.join(', ')}
                  </div>
                  <div>
                    <strong>Severity:</strong> {query.severity}
                  </div>
                  <div className="query-date">
                    {new Date(query.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;
