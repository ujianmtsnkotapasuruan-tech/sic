import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Reports({ user, onLogout }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [classReport, setClassReport] = useState(null);
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

  const fetchClassReport = async (className) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/reports/class/${className}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClassReport(response.data.data);
    } catch (error) {
      console.error('Error fetching class report:', error);
    }
  };

  const handleClassChange = (e) => {
    const className = e.target.value;
    setSelectedClass(className);
    if (className) {
      fetchClassReport(className);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Reports & Analytics</h1>
        <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
      </header>

      <div className="container">
        <div className="card">
          <h2>Teaching Summary</h2>
          {loading ? (
            <p>Loading...</p>
          ) : stats ? (
            <div className="stats-summary">
              <div className="stat-item">
                <span className="stat-label">Total Lessons</span>
                <span className="stat-value">{stats.totalLessons || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total Hours Taught</span>
                <span className="stat-value">{stats.totalHours || 0}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Average Participation Rate</span>
                <span className="stat-value">{(stats.avgParticipation * 100 || 0).toFixed(0)}%</span>
              </div>
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="card">
          <h2>Class Report</h2>
          <div className="form-group">
            <label>Select Class</label>
            <select value={selectedClass} onChange={handleClassChange}>
              <option value="">Choose a class...</option>
              <option>Class A</option>
              <option>Class B</option>
              <option>Class C</option>
            </select>
          </div>

          {classReport && (
            <div className="class-report">
              <h3>{classReport.className}</h3>
              <p><strong>Total Lessons:</strong> {classReport.totalLessons}</p>
              <p><strong>Total Students:</strong> {classReport.totalStudents}</p>
              
              <h4>Recent Lessons</h4>
              {classReport.lessons && classReport.lessons.length > 0 ? (
                <ul>
                  {classReport.lessons.map(lesson => (
                    <li key={lesson._id}>
                      <strong>{lesson.subject}</strong> - {new Date(lesson.date).toLocaleDateString()}
                      ({lesson.duration} minutes)
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No lessons recorded</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;
