import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// --- NAVBARS IMPORTS ---
import Navbar from './Components/UserNavbar.jsx';
import AdminNavbar from './Components/AdminNavbar.jsx';

// --- PAGES IMPORTS ---
import Welcomepage from './Components/Welcomepage.jsx';
import UserHome from './pages/user/UserHome.jsx';
import AdminHome from './pages/admin/AdminHome.jsx';
import UserLogin from './pages/user/userlogin.jsx';
import Register from './pages/user/Register';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import CreateBlog from './pages/admin/CreateBlog';

function App() {
  const location = useLocation();
  
  // 1. Jin pages par koi bhi Navbar nahi chahiye (Welcome & Auth)
  const hideAllNavbar = ['/', '/login', '/register', '/admin-login'].includes(location.pathname);
  
  // 2. ✨ STRICT CHECK: Sirf wahi routes jahan Admin Navbar aani chahiye
  // Yahan hum strictly check kar rahe hain ki '/userhome' ko chhod kar baki admin pages par hi ye dikhe
  const isAdminRoute = 
    location.pathname === '/adminhome' || 
    location.pathname === '/dashboard' || 
    location.pathname === '/create' || 
    location.pathname.startsWith('/Editblog');

  return (
    <>
      {/* 3. Global Automated Switcher */}
      {!hideAllNavbar && (isAdminRoute ? <AdminNavbar /> : <Navbar />)}
      
      <Routes>
        <Route path="/" element={<Welcomepage />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* Admin Section */}
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/Editblog/:id" element={<CreateBlog />} />

        {/* User Section */}
        <Route path="/userhome" element={<UserHome />} />
      </Routes>
    </>
  );
}

export default App;