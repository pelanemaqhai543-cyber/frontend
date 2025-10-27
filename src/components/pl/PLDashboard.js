import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Classes from './Classes';
import Courses from './Courses';
import Monitoring from './Monitoring';
import Rating from './Rating';
import Reports from './Reports';
import { FaChalkboardTeacher, FaBook, FaEye, FaStar, FaFileAlt } from 'react-icons/fa';

const PLDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        .sidebar {
          width: ${sidebarOpen ? '250px' : '200px'};
          min-height: 100vh;
          background-color: #2c3e50;
          color: white;
          transition: width 0.3s ease-in-out;
        }

        .sidebar .logo-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px 0;
        }

        .sidebar .logo-container img {
          width: 60px;
          height: auto;
          margin-bottom: 10px;
        }

        .sidebar .brand {
          font-size: 18px;
          font-weight: bold;
          color: #fff; 
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding: 0 10px 20px;
        }

        .sidebar .nav-link {
          color: white;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 16px;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 4px;
          transition: background 0.2s;
        }

        .sidebar .nav-link:hover {
          background-color: #34495e;
          color: #ffc107;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: white;
          padding: 20px 30px;
          border-bottom: 1px solid #ddd;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .header h2 {
          margin: 0;
          color: #2c3e50;
          font-weight: 600;
        }

        .header .btn {
          background-color: #fff;
          color: #007bff;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          font-weight: bold;
          cursor: pointer;
        }

        .header .btn:hover {
          background-color: #e0e0e0;
        }
      `}</style>

      <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif' }}>
        {/* Sidebar */}
        <nav className="sidebar">
         
          <div className="logo-container">
            <img src="/images/log3.jpg" alt="LUCT Logo" />
            <div className="brand">
              LIMKONKWING UNIVERSITY <br />OF CREATIVE TECHNOLOGY
            </div>
          </div>

          <div>
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="btn btn-primary mx-3 mt-3"
              style={{
                color: '#2c3e50',
                fontWeight: '600',
                fontSize: '14px',
                borderRadius: '5px',
                width: 'calc(50% - 2rem)',
                padding: '10px 0',
              }}
            >
              ← Back
            </button>

            <Link to="/pl/dashboard/classes" className="nav-link">
              <FaChalkboardTeacher /> Classes
            </Link>
            <Link to="/pl/dashboard/courses" className="nav-link">
              <FaBook /> Courses
            </Link>
            <Link to="/pl/dashboard/monitoring" className="nav-link">
              <FaEye /> Monitoring
            </Link>
            <Link to="/pl/dashboard/rating" className="nav-link">
              <FaStar /> Rating
            </Link>
            <Link to="/pl/dashboard/reports" className="nav-link">
              <FaFileAlt /> Reports
            </Link>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-grow-1 bg-light" style={{ minHeight: '100vh' }}>
          {/* Header */}
          <div className="header">
            <h2>PL Dashboard</h2>
            <div>
              <button className="btn me-2">Home</button>
              <button className="btn">Add</button>
            </div>
          </div>

          {/* Page content */}
          <div style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100%' }}>
            <Routes>
              <Route path="classes" element={<Classes />} />
              <Route path="courses" element={<Courses />} />
              <Route path="monitoring" element={<Monitoring />} />
              <Route path="rating" element={<Rating />} />
              <Route path="reports" element={<Reports />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default PLDashboard;
