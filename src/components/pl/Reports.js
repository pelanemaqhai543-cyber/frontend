import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get('/api/reports', { headers })
      .then(res => setReports(res.data))
      .catch(err => alert('Failed to fetch reports'));
  }, []);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`/api/search/reports?query=${searchQuery}`, { headers });
      setReports(res.data);
    } catch (err) {
      alert('Search failed');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Reports</h3>
      <input
        type="text"
        placeholder="Search reports..."
        className="form-control mb-3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="btn btn-secondary mb-3">Search</button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Week</th>
            <th>Date</th>
            <th>Lecturer</th>
            <th>Topic</th>
            <th>PRL Feedback</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.week}</td>
              <td>{report.date}</td>
              <td>{report.lecturer_name}</td>
              <td>{report.topic_taught}</td>
              <td>{report.prl_feedback || 'None'}</td>
              <td>
                <a href={`/api/reports/${report.id}/excel`} className="btn btn-sm btn-info">Download</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;