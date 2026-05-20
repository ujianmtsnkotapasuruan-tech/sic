import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/reports/summary', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Teaching Journal</h1>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </header>

      <div className="container">
        <div className="dashboard-grid">
          <div className="stat-card">
            <h3>Total Lessons</h3>
            <p className="stat-number">{stats?.totalLessons || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Total Hours</h3>
            <p className="stat-number">{stats?.totalHours || 0}</p>
          </div>
          <div className="stat-card">
            <h3>Avg Participation</h3>
            <p className="stat-number">{(stats?.avgParticipation * 100 || 0).toFixed(0)}%</p>
          </div>
        </div>

        <div className="quick-links">
          <h2>Quick Access</h2>
          <div className="links-grid">
            <button onClick={() => navigate('/entries')} className="btn btn-primary">
              📝 New Entry
            </button>
            <button onClick={() => navigate('/entries')} className="btn btn-primary">
              📚 View Entries
            </button>
            <button onClick={() => navigate('/students')} className="btn btn-primary">
              👥 Manage Students
            </button>
            <button onClick={() => navigate('/reports')} className="btn btn-primary">
              📊 Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
