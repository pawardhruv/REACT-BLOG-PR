import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout Admin?");
    if (confirmLogout) {
      alert("Admin Logged Out");
      navigate('/');
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backgroundColor: 'rgba(11, 19, 43, 0.75)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(72, 202, 228, 0.15)',
        padding: '12px 0',
        zIndex: 1000
      }}
    >
      <div className="container">
        
        {/* Logo (Bilkul Aapka Original Name) */}
        <Link
          className="navbar-brand fw-bold"
          to="/adminhome"
          style={{
            color: '#e0e1dd',
            fontSize: '26px',
            fontFamily: 'sans-serif',
            letterSpacing: '1.5px',
            transition: 'color 0.3s ease'
          }}
        >
          Aawara<span style={{ color: '#48cae4' }}>Musafir..</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ border: 'none', padding: '6px' }}
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1) sepia(1) saturate(5) hue-rotate(160deg)' }}></span>
        </button>

        {/* Navbar Links Context wrapper */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center mt-3 mt-lg-0">

            {/* Home Link (Is par click karne se sab vlogs dikhenge) */}
            <li className="nav-item mx-lg-3 my-2 my-lg-0">
              <Link
                className="nav-link custom-nav-link"
                to="/adminhome"
                style={{
                  color: '#e0e1dd',
                  fontWeight: '600',
                  fontSize: '16px',
                  padding: '5px 0',
                  position: 'relative'
                }}
              >
                Home
              </Link>
            </li>

            {/* Dashboard Link (Is par click karne se dashboard page khulega) */}
            <li className="nav-item mx-lg-3 my-2 my-lg-0">
              <Link
                className="nav-link custom-nav-link"
                to="/dashboard"
                style={{
                  color: '#e0e1dd',
                  fontWeight: '600',
                  fontSize: '16px',
                  padding: '5px 0',
                  position: 'relative'
                }}
              >
                Dashboard
              </Link>
            </li>

            {/* Add Vlog Link (Is par click karne se blog create hoga) */}
            <li className="nav-item mx-lg-3 my-2 my-lg-0">
              <Link
                className="nav-link custom-nav-link"
                to="/create"
                style={{
                  color: '#e0e1dd',
                  fontWeight: '600',
                  fontSize: '16px',
                  padding: '5px 0',
                  position: 'relative'
                }}
              >
                Add Vlog
              </Link>
            </li>

            {/* Account Dropdown (Sirf Logout Option ke sath) */}
            <li className="nav-item dropdown mx-lg-3 my-2 my-lg-0">
              <a
                className="nav-link dropdown-toggle custom-dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  color: '#e0e1dd',
                  fontWeight: '600',
                  fontSize: '16px',
                  padding: '5px 10px'
                }}
              >
                Admin
              </a>
              <ul 
                className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2 py-2"
                style={{
                  backgroundColor: '#0b132b',
                  border: '1px solid rgba(72, 202, 228, 0.2) !important',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <li>
                  <button 
                    className="dropdown-item custom-drop-item py-2" 
                    onClick={handleLogout}
                    style={{ background: 'transparent', border: 'none', width: '100%', textAlgin: 'left' }}
                  >
                    🔒 Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Embedded Hover Effects & Custom Classes (Exactly Yours) */}
      <style>{`
        .custom-nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background-color: #48cae4;
          box-shadow: 0 0 8px #48cae4;
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .custom-nav-link:hover::after {
          width: 100%;
        }
        .custom-nav-link:hover {
          color: #48cae4 !important;
        }

        .custom-dropdown-toggle:hover, .custom-dropdown-toggle:focus {
          color: #48cae4 !important;
        }

        .custom-drop-item {
          color: #e0e1dd !important;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.2s ease-in-out;
          background: transparent !important;
        }
        .custom-drop-item:hover {
          color: #0b132b !important;
          background-color: #48cae4 !important;
          padding-left: 20px !important;
        }

        .custom-toggler:focus {
          box-shadow: 0 0 0 0.22rem rgba(72, 202, 228, 0.3) !important;
        }
        
        @media (max-width: 991px) {
          .dropdown-menu {
            background-color: rgba(11, 19, 43, 0.95) !important;
            border: 1px solid rgba(72, 202, 228, 0.1) !important;
            text-align: center;
          }
          .custom-drop-item:hover {
            padding-left: 15px !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default AdminNavbar;