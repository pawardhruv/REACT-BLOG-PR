import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  
  
  const [likedAdminBlogs, setLikedAdminBlogs] = useState({});

  
  useEffect(() => {
    fetch('http://localhost:3000/blogs')
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      })
      .catch((err) => console.log("Data nahi mila:", err));
    
  
    const savedLikes = localStorage.getItem('admin_likes');
    if (savedLikes) setLikedAdminBlogs(JSON.parse(savedLikes));
  }, []);

  const handleShareClick = (id, title) => {
    const blogUrl = `${window.location.origin}/blog/${id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(blogUrl)
        .then(() => alert(`Link copied for: "${title}"`))
        .catch((err) => console.error("Could not copy text: ", err));
    } else {
      alert(`Blog Link: ${blogUrl}`);
    }
  };

  // Like Toggle Function for Admin Cards
  const toggleLike = (id) => {
    setLikedAdminBlogs((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem('admin_likes', JSON.stringify(updated));
      return updated;
    });
  };

  // Common Search & Keyword Filter Engine
  const filteredBlogs = blogs.filter((item) => {
    const titleMatch = item.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const descMatch = item.desc?.toLowerCase().includes(searchQuery.toLowerCase());
    return titleMatch || descMatch;
  });

  // Sorting Logic
  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // SEGREGATION LOGIC: Separating User blogs from Admin blogs
  // (Assuming admin blogs have role/author === 'admin' or an admin flag)
  const userBlogs = sortedBlogs.filter(blog => blog.author !== 'admin' && !blog.isAdmin);
  const adminBlogs = sortedBlogs.filter(blog => blog.author === 'admin' || blog.isAdmin);

  return (
    <div
      className="container-fluid py-5"
      style={{    
        backgroundColor: '#0b132b', 
        backgroundImage: 'radial-gradient(circle, rgba(28,37,65,0.85) 0%, rgba(11,19,43,1) 100%)',
        color: '#e0e1dd',
        minHeight: '100vh',
        fontFamily: 'sans-serif'
      }}
    >
      {/* Title Header */}
      <div className="text-center mb-5">
        <h1
          style={{
            fontSize: 'calc(28px + 1.5vw)',
            fontWeight: 'bold',
            color: '#e0e1dd',
            letterSpacing: '3px'
          }}
        >
          " The Aawara Archive "
        </h1>
        <p
          style={{
            color: '#48cae4',
            fontSize: '16px',
            marginTop: '10px',
            fontStyle: 'italic',
            opacity: '0.8'
          }}
        >
          Every mile a memory, every thought a page...
        </p>
      </div>

      {/* Toolbar Controls */}
      <div className="container mb-5 p-4" style={{ 
        backgroundColor: 'rgba(11, 19, 43, 0.5)', 
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(72, 202, 228, 0.15)',
        borderRadius: '12px'
      }}>
        <div className="row g-3 align-items-center">
          <div className="col-md-8">
            <input 
              type="text"
              className="form-control toolbar-input"
              placeholder="🔍 Search stories across all sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select 
              className="form-select toolbar-input" 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newest">Latest Stories (Newest First)</option>
              <option value="oldest">Classic Era (Oldest First)</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 1: YOUR BLOGS (USER CREATED) */}
      <div className="container mb-5">
        <div className="d-flex align-items-center mb-4">
          <h2 className="section-title">Your Blogs</h2>
          <div className="flex-grow-1 ms-3" style={{ height: '1px', background: 'linear-gradient(90deg, rgba(72,202,228,0.4), transparent)' }}></div>
        </div>

        <div className="row">
          {userBlogs.length > 0 ? (
            userBlogs.map((item) => (
              <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                <div className="card h-100 border-0 blog-hover-card">
                  <div style={{ overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={item.image || 'https://via.placeholder.com/400x230'}
                      alt="User Story"
                      className="card-img-top blog-card-img"
                    />
                  </div>
                  <div className="card-body p-4">
                    <small style={{ color: '#48cae4', fontWeight: 'bold' }}>✍️ Personal Log</small>
                    <span className="text-muted float-end fs-7">{item.date}</span>
                    <h4 className="mt-2 card-blog-title">{item.title}</h4>
                    <p className="card-blog-desc">
                      {item.desc ? `${item.desc.slice(0, 100)}...` : 'No custom content written.'}
                    </p>
                  </div>
                  
                  {/* Action Buttons Container */}
                  <div className="card-footer border-0 bg-transparent px-4 pb-4 pt-0">
                    <div className="row g-2">
                      <div className="col-6">
                        <Link to={`/Editblog/${item.id}`} className="btn btn-outline-warning w-100 action-btn py-2">
                          ✏️ Edit
                        </Link>
                      </div>
                      <div className="col-6">
                        <button 
                          onClick={() => handleShareClick(item.id, item.title)} 
                          className="btn btn-outline-info w-100 action-btn py-2"
                        >
                          🔗 Share
                        </button>
                      </div>
                    </div>
                    <Link to={`/blog/${item.id}`} className="btn btn-cyan-primary w-100 mt-2 py-2">
                      Read Full Story →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-4">
              <p className="text-muted">You haven't added any blogs yet. Create one to populate this workspace! ✨</p>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: ADMIN ARCHIVES (COMMUNITY POSTS) */}
      <div className="container">
        <div className="d-flex align-items-center mb-4">
          <h2 className="section-title" style={{ color: '#48cae4' }}>Admin Archives</h2>
          <div className="flex-grow-1 ms-3" style={{ height: '1px', background: 'linear-gradient(90deg, rgba(72,202,228,0.4), transparent)' }}></div>
        </div>

        <div className="row">
          {adminBlogs.length > 0 ? (
            adminBlogs.map((item) => (
              <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                <div className="card h-100 border-0 blog-hover-card" style={{ border: '1px solid rgba(72, 202, 228, 0.2) !important' }}>
                  <div style={{ overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={item.image || 'https://via.placeholder.com/400x230'}
                      alt="Admin Feature"
                      className="card-img-top blog-card-img"
                    />
                    <span className="position-absolute top-0 start-0 bg-info text-dark px-3 py-1 m-3 rounded-pill fw-bold fs-7 shadow">
                      ⭐ Featured
                    </span>
                  </div>
                  <div className="card-body p-4">
                    <small style={{ color: '#d4a373', fontWeight: 'bold' }}>🛡️ Official Travelogue</small>
                    <span className="text-muted float-end fs-7">{item.date}</span>
                    <h4 className="mt-2 card-blog-title">{item.title}</h4>
                    <p className="card-blog-desc">
                      {item.desc ? `${item.desc.slice(0, 100)}...` : 'Official documentation pending.'}
                    </p>
                  </div>
                  
                  {/* Action Buttons Container */}
                  <div className="card-footer border-0 bg-transparent px-4 pb-4 pt-0">
                    <div className="row g-2">
                      <div className="col-6">
                        <button 
                          onClick={() => toggleLike(item.id)}
                          className={`btn w-100 action-btn py-2 ${likedAdminBlogs[item.id] ? 'btn-danger text-white' : 'btn-outline-danger'}`}
                        >
                          {likedAdminBlogs[item.id] ? '❤️ Liked' : '🤍 Like'}
                        </button>
                      </div>
                      <div className="col-6">
                        <button 
                          onClick={() => handleShareClick(item.id, item.title)}
                          className="btn btn-outline-info w-100 action-btn py-2"
                        >
                          🔗 Share
                        </button>
                      </div>
                    </div>
                    <Link to={`/blog/${item.id}`} className="btn btn-cyan-primary w-100 mt-2 py-2">
                      Explore Edition →
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-4">
              <p className="text-muted">No official logs match your current query parameters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Injecting Core Architectural Scopes & Global Modifiers */}
      <style>{`
        .section-title {
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #e0e1dd;
          text-shadow: 0 0 10px rgba(224, 225, 221, 0.1);
        }
        .toolbar-input {
          background-color: rgba(11, 19, 43, 0.8) !important;
          border: 1px solid rgba(72, 202, 228, 0.2) !important;
          color: #e0e1dd !important;
          padding: 12px 15px !important;
          border-radius: 8px !important;
        }
        .toolbar-input:focus {
          border-color: #48cae4 !important;
          box-shadow: 0 0 0 0.25rem rgba(72, 202, 228, 0.15) !important;
        }
        .toolbar-input option {
          background-color: #0b132b;
          color: #e0e1dd;
        }
        .blog-hover-card {
          background-color: rgba(11, 19, 43, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(72, 202, 228, 0.1);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .blog-hover-card:hover {
          transform: translateY(-8px);
          border-color: rgba(72, 202, 228, 0.35) !important;
          box-shadow: 0 10px 25px rgba(72, 202, 228, 0.15) !important;
        }
        .blog-card-img {
          height: 210px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .blog-hover-card:hover .blog-card-img {
          transform: scale(1.05);
        }
        .card-blog-title {
          color: #e0e1dd;
          font-weight: bold;
          font-size: 19px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .card-blog-desc {
          color: #e0e1dd;
          line-height: 1.6;
          font-size: 14px;
          opacity: 0.7;
          height: 65px;
          overflow: hidden;
        }
        .action-btn {
          font-size: 13px !important;
          font-weight: 600 !important;
          border-radius: 6px !important;
          transition: all 0.2s ease !important;
        }
        .btn-cyan-primary {
          background-color: #48cae4 !important;
          color: #0b132b !important;
          font-weight: bold !important;
          font-size: 14px !important;
          border-radius: 6px !important;
          border: none !important;
          transition: all 0.2s ease !important;
        }
        .btn-cyan-primary:hover {
          background-color: #3aa6bd !important;
          box-shadow: 0 4px 12px rgba(72, 202, 228, 0.3) !important;
        }
        .fs-7 {
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
};

export default Home;