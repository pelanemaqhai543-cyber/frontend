import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'student',
    faculty: 'Faculty of Information Communication Technology',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', form);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("/images/rgbak.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',

        fontFamily: 'Arial, sans-serif',
        position: 'relative', 
      }}
    >
      
      <button
        onClick={() => navigate(-1)}
        style={{
          position: 'absolute',
          left: '20px',
          top: '20px',
          backgroundColor: '#f5f5fcff',
          color: '#2c3e50',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        ← Back
      </button>

      <div
        style={{
          width: '400px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            backgroundColor: '#0c0c0cff',
            padding: '30px 20px',
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '28px' }}>Register</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            padding: '30px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
              }}
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="prl">Principal Lecturer</option>
              <option value="pl">Program Leader</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Faculty</label>
            <input
              type="text"
              name="faculty"
              value={form.faculty}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0a0a0bff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            Register
          </button>
          <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#004080', textDecoration: 'none' }}>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
