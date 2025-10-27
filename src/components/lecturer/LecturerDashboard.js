import React, { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LecturerClasses from './Classes';
import LecturerReports from './Reports';
import LecturerMonitoring from './Monitoring';
import LecturerRating from './Rating';
import { FaChalkboardTeacher, FaFileAlt, FaEye, FaStar } from 'react-icons/fa';

const LecturerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

        .sidebar .brand {
          padding: 20px;
          font-size: 16px;
          font-weight: bold;
          color: #fff; 
          text-align: center;
          border-bottom: 1px solid rgba(255,255,255,0.1);
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
          color: #103b68;
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
        
        <nav className="sidebar">
          
          <div className="logo-container">
            <img src="/images/log3.jpg" alt="LUCT Logo" />
            <div className="brand">
              LIMKOKWING UNIVERSITY <br />OF CREATIVE TECHNOLOGY
            </div>
          </div>

          <div>
            
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

            <Link to="/lecturer/dashboard/classes" className="nav-link">
              <FaChalkboardTeacher /> Classes
            </Link>
            <Link to="/lecturer/dashboard/reports" className="nav-link">
              <FaFileAlt /> Reports
            </Link>
            <Link to="/lecturer/dashboard/monitoring" className="nav-link">
              <FaEye /> Monitoring
            </Link>
            <Link to="/lecturer/dashboard/rating" className="nav-link">
              <FaStar /> Rating
            </Link>
          </div>
        </nav>

       
        <main className="flex-grow-1 bg-light" style={{ minHeight: '100vh' }}>
      
          <div className="header">
            <h2>Lecturer Dashboard</h2>
            <div>
              <button className="btn me-2">Home</button>
              <button className="btn">Add</button>
            </div>
          </div>

      
          <div style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100%' }}>
            <Routes>
              <Route path="classes" element={<LecturerClasses />} />
              <Route path="reports" element={<LecturerReports />} />
              <Route path="monitoring" element={<LecturerMonitoring />} />
              <Route path="rating" element={<LecturerRating />} />
            </Routes>
          </div>
        </main>
      </div>
    </>
  );
};

export default LecturerDashboard;
