import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userData.password !== userData.confirmPassword) {
      alert("Password aur Confirm Password match nahi ho rahe hain!");
      return;
    }

    const newUser = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      role: "user" 
    };

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response main dikkat hai");
      }
      alert("Registration Successful!");
      navigate('/');
    })
    .catch(err => {
      console.error("Register karne mein error aaya:", err);
      alert("Server se connect nahi ho paa raha hai. Pehle 'json-server' check karein.");
    });
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
        overflow: 'y-auto', // Scroll safety fixed
        padding: '40px 0',
        zIndex: 1 // Base container setup
      }}
    >
      {/* Clean Glass Card */}
      <div 
        className="p-5 shadow-lg mx-3" 
        style={{ 
          width: '440px', 
          backgroundColor: 'rgba(11, 19, 43, 0.75)', // Opacity optimized for clarity
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(72, 202, 228, 0.25)',
          borderRadius: '12px',
          zIndex: 10, // Explicit interaction priority layer
          position: 'relative'
        }}
      >
        <h3 className="text-center fw-bold mb-4" style={{ letterSpacing: '1px', color: '#e0e1dd' }}>
          Create Account
        </h3>
        
        <form onSubmit={handleSubmit}>
          
          {/* Username Input */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-uppercase" style={{ color: '#d4a373', letterSpacing: '1px' }}>
              Username
            </label>
            <input 
              type="text" 
              name="username"
              className="form-control style-input" 
              placeholder="Enter username"
              value={userData.username}
              onChange={handleChange}
              required 
            />
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-uppercase" style={{ color: '#d4a373', letterSpacing: '1px' }}>
              Email Address
            </label>
            <input 
              type="email" 
              name="email"
              className="form-control style-input" 
              placeholder="name@example.com"
              value={userData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label fw-bold small text-uppercase" style={{ color: '#d4a373', letterSpacing: '1px' }}>
              Password
            </label>
            <input 
              type="password" 
              name="password"
              className="form-control style-input" 
              placeholder="Enter password"
              value={userData.password}
              onChange={handleChange}
              required 
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="form-label fw-bold small text-uppercase" style={{ color: '#d4a373', letterSpacing: '1px' }}>
              Confirm Password
            </label>
            <input 
              type="password" 
              name="confirmPassword"
              className="form-control style-input" 
              placeholder="Retype password"
              value={userData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>
          
          {/* Clean Interactive Button */}
          <button 
            type="submit" 
            className="btn w-100 fw-bold py-2 mt-2 register-submit-btn" 
            style={{ 
              backgroundColor: '#d4a373', 
              color: '#0b132b',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              position: 'relative',
              zIndex: 20 // Button element gets top priority
            }}
          >
            Register Now
          </button>
        </form>

        {/* Simple Footer Link */}
        <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid rgba(224, 225, 221, 0.1)' }}>
          <p className="mb-0 small" style={{ color: '#e0e1dd', opacity: '0.7' }}>
            Already have an account?{' '}
            <Link to="/" style={{ color: '#d4a373', textDecoration: 'none', fontWeight: 'bold', position: 'relative', zIndex: 20 }}>
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Pure CSS Native Fixes */}
      <style>{`
        .style-input {
          background-color: rgba(11, 19, 43, 0.8) !important;
          border: 1px solid rgba(72, 202, 228, 0.3) !important;
          color: #e0e1dd !important;
          padding: 10px 12px !important;
          border-radius: 6px !important;
          position: relative;
          z-index: 15;
        }
        .style-input:focus {
          background-color: #0b132b !important;
          border-color: #d4a373 !important;
          box-shadow: 0 0 0 0.25rem rgba(212, 163, 115, 0.25) !important;
          color: #e0e1dd !important;
        }
        .style-input::placeholder {
          color: rgba(224, 225, 221, 0.3) !important;
        }
        .register-submit-btn:hover {
          background-color: #c39263 !important;
          cursor: pointer;
        }
        .register-submit-btn:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default Register;