import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Gauge = ({ value, onChange }) => {
  const svgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const radius = 70;
  const centerX = 100;
  const centerY = 80;
  const bounds = [300, 580, 640, 720, 780, 850];
  const colors = ['#ff4444', '#ffaa00', '#ffdd44', '#88ff88', '#44aa44'];
  const labels = ['Very Poor', 'Poor', 'Fair', 'Good', 'Excellent'];

  const getXY = (angle, rad = radius) => ({
    x: centerX + rad * Math.cos(angle),
    y: centerY - rad * Math.sin(angle)
  });

  const fraction = value < 1 ? 0 : value > 5 ? 1 : (value - 1) / 4;
  const currentAngle = Math.PI * (1 - fraction);
  const needleEnd = getXY(currentAngle);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    let dx = mouseX - centerX;
    let dy = mouseY - centerY;
    let angle = Math.atan2(-dy, dx);
    angle = Math.max(0, Math.min(Math.PI, angle));
    const newFraction = (Math.PI - angle) / Math.PI;
    const newValue = Math.round(1 + newFraction * 4);
    onChange(newValue);
  };

  useEffect(() => {
    if (!isDragging) return;
    const moveHandler = handleMouseMove;
    const upHandler = () => setIsDragging(false);
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
    return () => {
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };
  }, [isDragging]);

  return (
    <svg ref={svgRef} width="200" height="120" style={{ display: 'block' }} onMouseDown={handleMouseDown}>
      {bounds.slice(0, -1).map((_, i) => {
        const scoreStart = bounds[i];
        const scoreEnd = bounds[i + 1];
        const angleStart = Math.PI - (scoreStart - 300) / 550 * Math.PI;
        const angleEnd = Math.PI - (scoreEnd - 300) / 550 * Math.PI;
        const startXY = getXY(angleStart);
        const endXY = getXY(angleEnd);
        return (
          <path
            key={i}
            d={`M ${startXY.x} ${startXY.y} A ${radius} ${radius} 0 0 0 ${endXY.x} ${endXY.y}`}
            stroke={colors[i]}
            strokeWidth="18"
            fill="none"
          />
        );
      })}
      {bounds.map((score, i) => {
        const angle = Math.PI - (score - 300) / 550 * Math.PI;
        const innerR = radius - 10;
        const innerXY = getXY(angle, innerR);
        const outerXY = getXY(angle);
        const fillC = colors[Math.min(i, 4)];
        const numY = centerY + 25;
        return (
          <g key={i}>
            <line
              x1={innerXY.x}
              y1={innerXY.y}
              x2={outerXY.x}
              y2={outerXY.y}
              stroke="#666"
              strokeWidth="2"
            />
            <circle cx={outerXY.x} cy={numY} r="4" fill={fillC} />
            <text
              x={outerXY.x}
              y={numY + 1}
              textAnchor="middle"
              fontSize="8"
              fill="white"
              fontWeight="bold"
            >
              {score}
            </text>
          </g>
        );
      })}
      {labels.map((label, i) => {
        const scoreMid = (bounds[i] + bounds[i + 1]) / 2;
        const angleMid = Math.PI - (scoreMid - 300) / 550 * Math.PI;
        const midXY = getXY(angleMid, radius + 10);
        const textElement = i === 0 ? (
          <text x={midXY.x} y={midXY.y} textAnchor="middle" fontSize="8" fill="#333" dominantBaseline="central">
            <tspan x={midXY.x} dy="-4">Very</tspan>
            <tspan x={midXY.x} dy="10">Poor</tspan>
          </text>
        ) : (
          <text x={midXY.x} y={midXY.y} textAnchor="middle" fontSize="8" fill="#333" dominantBaseline="central">
            {label}
          </text>
        );
        return textElement;
      })}
      <line
        x1={centerX}
        y1={centerY}
        x2={needleEnd.x}
        y2={needleEnd.y}
        stroke="#333"
        strokeWidth="3"
      />
      <circle cx={needleEnd.x} cy={needleEnd.y} r="4" fill="#666" />
      <circle cx={centerX} cy={centerY} r="6" fill="#666" />
    </svg>
  );
};

const Rating = () => {
  const [reports, setReports] = useState([]);
  const [ratings, setRatings] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios.get('/api/reports', { headers })
      .then(res => setReports(res.data))
      .catch(err => alert('Failed to fetch reports'));
  }, []);

  const handleRatingChange = (reportId, field, value) => {
    setRatings(prev => ({
      ...prev,
      [reportId]: {
        ...prev[reportId],
        [field]: value
      }
    }));
  };

  const handleAddRating = async (reportId) => {
    const ratingData = ratings[reportId] || { rating: 0, comments: '' };
    if (!ratingData.rating || ratingData.rating < 1 || ratingData.rating > 5) {
      alert('Rating must be between 1 and 5');
      return;
    }
    try {
      await axios.post('/api/ratings', { report_id: reportId, ...ratingData }, { headers });
      alert('Rating added');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add rating');
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
      <h3>Rate Reports</h3>
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
            <th>Lecturer</th>
            <th>Topic</th>
            <th>Rating (1-5)</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(report => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.lecturer_name}</td>
              <td>{report.topic_taught}</td>
              <td>
                <Gauge
                  value={ratings[report.id]?.rating || 0}
                  onChange={(v) => handleRatingChange(report.id, 'rating', v)}
                />
              </td>
              <td>
                <textarea
                  className="form-control"
                  value={ratings[report.id]?.comments || ''}
                  onChange={(e) => handleRatingChange(report.id, 'comments', e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleAddRating(report.id)} className="btn btn-sm btn-primary">Rate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rating;