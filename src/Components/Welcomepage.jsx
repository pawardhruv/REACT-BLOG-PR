import React from 'react';
import { Link } from 'react-router-dom';

const Welcomepage = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#0b132b', 
        backgroundImage: 'radial-gradient(circle, rgba(28,37,65,0.85) 0%, rgba(11,19,43,1) 100%)',
        color: '#e0e1dd',
        fontFamily: "'Playfair Display', Georgia, serif",
        position: 'relative',
        overflow: 'hidden'

      }}
    >
      <div className="text-center p-4" style={{ zIndex: 2 }}>

        {/* Creative Title Section */}
        <div className="position-relative d-inline-block mb-2">
          <h1 style={{
            fontSize: 'calc(32px + 3vw)',
            fontWeight: '900',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            margin: '0',
            lineHeight: '1.1'
          }}>
            AAWARA<span style={{ color: '#d4a373' }}>MUSAFIR</span>
          </h1>
          <div style={{
            height: '2px',
            backgroundColor: '#d4a373',
            width: '40%',
            margin: '15px auto 10px auto'
          }}></div>
        </div>

        <h3 style={{
          color: '#d4a373',
          fontWeight: '300',
          fontSize: '18px',
          letterSpacing: '8px',
          textTransform: 'uppercase',
          opacity: '0.9'
        }}>
          The Aawara Archive
        </h3>

        <p className="mt-4" style={{
          fontSize: '16px',
          color: '#e8d8c8',
          fontStyle: 'italic',
          opacity: '0.7',
          letterSpacing: '1px'
        }}>
          "Every mile a memory, every thought a page..."
        </p>

        {/* Minimalist Narrative Navigation (No Boring Buttons) */}
        <div className="mt-5 pt-3">
          <p className="mb-4" style={{ letterSpacing: '3px', fontSize: '12px', textTransform: 'uppercase', color: '#d4a373', opacity: '0.8' }}>
            Choose your path:
          </p>

          <div className="d-flex flex-column gap-4 align-items-center">

            {/* Link 01 - Login */}
            <Link to="/login" style={navItemStyle} className="nav-hover-effect">
              <span style={numberStyle}>01</span>
              <span>Enter the Journal</span>
              <span style={smallStyle}>— Existing Musafir (Login)</span>
            </Link>

            {/* Link 02 - Register */}
            <Link to="/register" style={navItemStyle} className="nav-hover-effect">
              <span style={numberStyle}>02</span>
              <span>Start a New Story</span>
              <span style={smallStyle}>— Join the Club (Register)</span>
            </Link>

            {/* Link 03 - Admin */}
            <Link to="/admin-login" style={{ ...navItemStyle, fontSize: '16px', marginTop: '15px' }} className="nav-hover-effect">
              <span style={{ ...numberStyle, borderColor: 'rgba(212,163,115,0.4)', color: 'rgba(212,163,115,0.4)' }}>—</span>
              <span style={{ opacity: 0.5 }}>Restricted Archives</span>
              <span style={smallStyle}>— (Admin Access)</span>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

const navItemStyle = {
  textDecoration: 'none',
  color: '#f5e6cc',
  fontSize: '22px',
  fontWeight: '400',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, color 0.2s ease'
};

const numberStyle = {
  fontSize: '11px',
  color: '#d4a373',
  marginRight: '15px',
  border: '1px solid #d4a373',
  padding: '3px 7px',
  borderRadius: '50%',
  fontWeight: 'bold',
  display: 'inline-block',
  lineHeight: '1'
};

const smallStyle = {
  fontSize: '12px',
  marginLeft: '10px',
  opacity: '0.4',
  letterSpacing: '1px',
  fontWeight: '300'
};

export default Welcomepage;