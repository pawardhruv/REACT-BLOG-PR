import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(users => {
        // Find user by email and password
        const userFound = users.find(u => u.email === email && u.password === password);

        if (userFound) {
          alert(`Welcome back, ${userFound.username}!`);
          
          // Role store kar rahe hain taaki navbar toggle handle ho sake
          localStorage.setItem('role', 'user'); 
          
          // ✨ FIXED: '/home' ki jagah sahi path '/userhome' kiya jo App.jsx me h
          navigate('/userhome'); 
        } else {
          alert('Galat Email ya Password! Dubara check karein.');
        }
      })
      .catch(err => console.error("Login error:", err));
  };
       
  return (
    <div 
      className="d-flex align-items-center justify-content-center" 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#0b132b', 
        backgroundImage: 'radial-gradient(circle, rgba(28,37,65,0.85) 0%, rgba(11,19,43,1) 100%)',
        color: '#e0e1dd',
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Clean Glass Card */}
      <div 
        className="p-5 shadow-lg" 
        style={{ 
          width: '420px', 
          backgroundColor: 'rgba(11, 19, 43, 0.6)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(72, 202, 228, 0.2)',
          borderRadius: '12px',
          zIndex: 2
        }}
      >
        <h3 className="text-center fw-bold mb-4" style={{ letterSpacing: '1px', color: '#e0e1dd' }}>
          User Login
        </h3>
        
        <form onSubmit={handleLogin}>
          
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-uppercase" style={{ color: '#d4a373', letterSpacing: '1px' }}>
              Email Address
            </label>
            <input 
              type="email" 
              className="form-control style-input" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required 
            />
          </div>
          
          {/* Password Input */}
          <div className="mb-4">
            <label className="form-label fw-bold small text-uppercase" style={{ color: '#d4a373', letterSpacing: '1px' }}>
              Password
            </label>
            <input 
              type="password" 
              className="form-control style-input" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              placeholder="Enter your password"
              required 
            />
          </div>
          
          {/* Clean Button */}
          <button 
            type="submit" 
            className="btn w-100 fw-bold py-2 mt-2" 
            style={{ 
              backgroundColor: '#d4a373', 
              color: '#0b132b',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              transition: 'all 0.2s ease'
            }}
          >
            Sign In
          </button>
        </form>

        {/* Simple Footer Link */}
        <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid rgba(224, 225, 221, 0.1)' }}>
          <p className="mb-0 small" style={{ color: '#e0e1dd', opacity: '0.7' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#d4a373', textDecoration: 'none', fontWeight: 'bold' }}>
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Inputs CSS Style Injection */}
      <style>{`
        .style-input {
          background-color: rgba(11, 19, 43, 0.8) !important;
          border: 1px solid rgba(72, 202, 228, 0.3) !important;
          color: #e0e1dd !important;
          padding: 10px 12px !important;
          border-radius: 6px !important;
        }
        .style-input:focus {
          background-color: #0b132b !important;
          border-color: #d4a373 !important;
          box-shadow: 0 0 0 0.25rem rgba(72, 202, 228, 0.15) !important;
          color: #e0e1dd !important;
        }
        .style-input::placeholder {
          color: rgba(224, 225, 221, 0.3) !important;
        }
      `}</style>
    </div>
  );
};

export default UserLogin;