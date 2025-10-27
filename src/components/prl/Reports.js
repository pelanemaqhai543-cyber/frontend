import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get('/api/reports', { headers })
      .then(res => setReports(res.data))
      .catch(err => alert('Failed to fetch reports'));
  }, []);

  const handleFeedbackChange = (id, value) => setFeedback({ ...feedback, [id]: value });

  const handleAddFeedback = async (id) => {
    try {
      await axios.put(`/api/reports/${id}/feedback`, { feedback: feedback[id] }, { headers });
      alert('Feedback added');
      axios.get('/api/reports', { headers }).then(res => setReports(res.data));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add feedback');
    }
  };

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
            <th>Feedback</th>
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
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={feedback[report.id] || report.prl_feedback || ''}
                  onChange={(e) => handleFeedbackChange(report.id, e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleAddFeedback(report.id)} className="btn btn-sm btn-primary">Add Feedback</button>
                <a href={`/api/reports/${report.id}/excel`} className="btn btn-sm btn-info mx-2">Download</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
