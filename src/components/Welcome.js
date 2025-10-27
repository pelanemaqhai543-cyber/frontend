import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Welcome = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      
      <header className="bg-dark text-white py-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-3">
              <img 
                src="/images/log3.jpg"
                alt="LUCT Logo"
                className="img-fluid"
                style={{ height: '50px' }}
              />
            </div>
            <div className="col-md-6">
              <h4 className="mb-0">LUCT Reporting System</h4>
            </div>
            <div className="col-md-3 text-end">
            
              <nav className="d-flex flex-column align-items-end">
                <div className="mt-2">
                  <Link to="/login" className="btn btn-sm btn-light me-2">Login</Link>
                  <Link to="/register" className="btn btn-sm btn-outline-light">Register</Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <section
        style={{
          backgroundImage: 'url("/images/bcgr.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          paddingTop: '5rem',
          paddingBottom: '5rem',
        }}
      >
        <div className="container text-center animated-text-container">
          <h1 className="display-4 fw-bold text-white mb-4">
            Welcome to LUCT Reporting System
          </h1>
          <p className="lead fw-bold text-black mb-2">
            Faculty of Information Communication Technology
          </p>
          <p className="lead fw-bold text-white">
            BSc Software Engineering with Multimedia, Semester 1
          </p>
        </div>
      </section>

     
      <section className="py-5 bg-dark">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-3 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img 
                  src="/images/tim.jpg"
                  className="card-img-top"
                  alt="Join Team"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Join the LUCT Team</h5>
                  <p className="card-text">Become part of our faculty and contribute to innovative teaching.</p>
                  <Link to="/register" className="btn btn-dark">Join Now</Link>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img 
                  src="/images/reps.webp"
                  className="card-img-top"
                  alt="Submit Reports"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Submit Lecture Reports</h5>
                  <p className="card-text">Track attendance, topics, and outcomes for your classes.</p>
                  <Link to="/lecturer/reports" className="btn btn-dark">Start Reporting</Link>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img 
                  src="/images/mon.webp"
                  className="card-img-top"
                  alt="Monitor Progress"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Monitor Progress</h5>
                  <p className="card-text">View real-time monitoring and feedback for all courses.</p>
                  <Link to="/prl/monitoring" className="btn btn-dark">View Dashboard</Link>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img 
                  src="/images/rate.jpg"
                  className="card-img-top"
                  alt="Use Rating System"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">Use Rating System</h5>
                  <p className="card-text">Rate lectures and provide feedback to improve teaching quality.</p>
                  <Link to="/student/rating" className="btn btn-dark">Rate Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-4 bg-white border-top"></section>

      {/* Footer */}
      <footer className="bg-dark text-white py-3 mt-auto">
        <div className="container text-center">
          <p className="mb-0">&copy; 2025 LUCT Reporting System. All rights reserved.</p>
          <p className="mb-0">
            <Link to="/privacy" className="text-white me-3">Privacy Policy</Link>
            <Link to="/terms" className="text-white">Terms of Service</Link>
          </p>
          <div className="mt-2">
            <FaFacebook className="me-3" size={24} />
            <FaTwitter className="me-3" size={24} />
            <FaLinkedin className="me-3" size={24} />
            <FaInstagram size={24} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
