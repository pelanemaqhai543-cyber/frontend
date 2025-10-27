import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', form);
      localStorage.setItem('token', res.data.token);
      const role = res.data.role;
      navigate(`/${role}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
         backgroundImage: 'url("/images/logbck.jpg")',
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
          backgroundColor: '#f4f4f8ff',
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
            backgroundColor: '#090a0aff',
            padding: '30px 20px',
            color: '#ffffff',
            textAlign: 'center',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '28px' }}>Login</h2>
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
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
              }}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input
              type="password"
              name="password"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxSizing: 'border-box',
              }}
              onChange={handleChange}
              required
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '14px',
              color: '#004080',
            }}
          >
            <div>
              <input type="checkbox" id="remember" style={{ marginRight: '5px' }} />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="/forgot-password" style={{ color: '#004080', textDecoration: 'none' }}>
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0f1010ff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            LOGIN
          </button>
          <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#004080', textDecoration: 'none' }}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
