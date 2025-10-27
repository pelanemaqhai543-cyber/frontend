import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentMonitoring from './Monitoring';
import StudentRating from './Rating';
import { FaEye, FaStar } from 'react-icons/fa';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          .sidebar {
            width: 260px;
            min-height: 100vh;
            background-color: #2c3e50;
            color: white;
          }

          .sidebar .logo-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0 10px;
          }

          .sidebar .logo-container img {
            width: 60px;
            height: auto;
            margin-bottom: 10px;
          }

          .sidebar .nav-logo {
            font-size: 20px;
            font-weight: bold;
            color: #fff; 
            text-align: center;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 15px;
            padding-left: 10px;
            padding-right: 10px;
          }

          .sidebar .nav-link {
            color: white;
            font-size: 16px;
            padding: 12px 20px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .sidebar .nav-link:hover {
            background-color: #34495e;
            border-radius: 4px;
            color: #ffc107 !important;
          }

          .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: white;
            padding: 20px 30px;
            border-bottom: 1px solid #ddd;
          }

          .dashboard-header h2 {
            margin: 0;
            font-weight: 600;
            color: #2c3e50;
          }

          .card-grid {
            display: flex;
            gap: 30px;
            padding: 40px 30px;
            flex-wrap: wrap;
          }

          .card-box {
            background: white;
            border-radius: 8px;
            padding: 40px 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            text-align: center;
            flex: 1 1 30%;
            min-width: 260px;
          }

          .card-box h5 {
            margin-top: 20px;
            color: #e67e22;
            font-weight: 700;
          }

          .card-box p {
            margin-top: 10px;
            color: #7f8c8d;
          }

          .top-right {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .icon-style {
            font-size: 40px;
            color: #2c3e50;
          }
        `}
      </style>

      <div className="d-flex" style={{ fontFamily: 'Arial, sans-serif' }}>
        {/* Sidebar */}
        <div className="sidebar">
          
          <div className="logo-container">
            <img src="/images/log3.jpg" alt="LUCT Logo" />
            <div className="nav-logo">
              LIMKONKWING UNIVERSITY <br />OF CREATIVE TECHNOLOGY
            </div>
          </div>

          
          <button
            onClick={() => navigate(-1)}
            className="btn btn-primary mx-3 mt-3"
            style={{
              color: '#2c3e50',
              fontWeight: 'bold',
              borderRadius: '5px',
              width: 'calc(50% - 2rem)',
              padding: '10px 0',
            }}
          >
            ← Back
          </button>

          <ul className="nav flex-column mt-3">
            <li className="nav-item">
              <Link to="/student/dashboard/monitoring" className="nav-link">
                <FaEye /> Monitoring
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/student/dashboard/rating" className="nav-link">
                <FaStar /> Rating
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 bg-light min-vh-100">
          
          <div className="dashboard-header">
            <h2>Student Dashboard</h2>
            <div className="top-right">
              <span style={{ fontSize: '14px', color: '#555' }}>Need Help?</span>
              <span style={{ fontWeight: '600', color: '#2c3e50' }}>Craig Ferentz ▾</span>
            </div>
          </div>

          {/* Cards */}
          <div className="card-grid">
            <div className="card-box">
              <FaEye className="icon-style" />
              <h5>MONITORING</h5>
              <p>Track your test progress and performance metrics</p>
            </div>
            <div className="card-box">
              <FaStar className="icon-style" />
              <h5>RATING</h5>
              <p>Rate your experience and view feedback summaries</p>
            </div>
          </div>

          {/* Route content */}
          <div className="p-4">
            <Routes>
              <Route path="monitoring" element={<StudentMonitoring />} />
              <Route path="rating" element={<StudentRating />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
