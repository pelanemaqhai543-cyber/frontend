import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PRLCourses from './Courses';
import PRLReports from './Reports';
import PRLMonitoring from './Monitoring';
import PRLRating from './Rating';
import PRLClasses from './Classes';
import { FaBook, FaFileAlt, FaEye, FaStar, FaChalkboardTeacher } from 'react-icons/fa';

const PRLDashboard = () => {
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

          .top-right {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .btn-style {
            background-color: #fff;
            color: #3f0071;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            margin-left: 10px;
          }

          .btn-style:hover {
            background-color: #e0e0e0;
            color: #3f0071 !important;
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
              <Link to="/prl/dashboard/courses" className="nav-link">
                <FaBook /> Courses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/prl/dashboard/reports" className="nav-link">
                <FaFileAlt /> Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/prl/dashboard/monitoring" className="nav-link">
                <FaEye /> Monitoring
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/prl/dashboard/rating" className="nav-link">
                <FaStar /> Rating
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/prl/dashboard/classes" className="nav-link">
                <FaChalkboardTeacher /> Classes
              </Link>
            </li>
          </ul>
        </div>

      
        <div className="flex-grow-1 bg-light min-vh-100">
          
          <div className="dashboard-header">
            <h2>PRL Dashboard</h2>
            <div className="top-right">
              <span style={{ fontSize: '14px', color: '#555' }}>Need Help?</span>
              <span style={{ fontWeight: '600', color: '#2c3e50' }}>Craig Ferentz ▾</span>
              <button className="btn-style">Home</button>
              <button className="btn-style">Add</button>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4">
            <Routes>
              <Route path="courses" element={<PRLCourses />} />
              <Route path="reports" element={<PRLReports />} />
              <Route path="monitoring" element={<PRLMonitoring />} />
              <Route path="rating" element={<PRLRating />} />
              <Route path="classes" element={<PRLClasses />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default PRLDashboard;
