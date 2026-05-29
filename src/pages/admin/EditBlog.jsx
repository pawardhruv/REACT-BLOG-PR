import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const WriteBlog = () => {
  const { id } = useParams(); // URL se ID nikalne ke liye
  const navigate = useNavigate();

  // Agar URL me ID hai toh Edit Mode 'true' hoga, nahi toh 'false'
  const isEditMode = Boolean(id);

  const [blog, setBlog] = useState({
    title: '',
    image: '',
    desc: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  });

  // 1. Fetch data ONLY if it is Edit Mode
  useEffect(() => {
    if (isEditMode) {
      fetch(`http://localhost:3000/blogs/${id}`)
        .then((res) => res.json())
        .then((data) => setBlog(data))
        .catch((err) => console.log("Data laane me error:", err));
    }
  }, [id, isEditMode]);

  // 2. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value
    });
  };

  // 3. Submit Handler (Dono Insert aur Update ke liye)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Agar edit mode hai toh URL me id jayegi aur method PUT hoga, nahi toh simple POST hoga
    const url = isEditMode ? `http://localhost:3000/blogs/${id}` : 'http://localhost:3000/blogs';
    const method = isEditMode ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(blog)
    })
      .then(() => {
        alert(isEditMode ? "Blog Updated Successfully! 🎉" : "Blog Created Successfully! ✨");
        navigate('/');
      })
      .catch((err) => console.log("Save karne me error:", err));
  };

  // 4. Delete Handler (Sirf Edit Mode me kaam aayega)
  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      fetch(`http://localhost:3000/blogs/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          alert("Blog Deleted Successfully");
          navigate('/');
        })
        .catch((err) => console.log("Delete karne me error:", err));
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '650px' }}>
      <div className="card shadow p-4 bg-dark text-white border-secondary">
        
        {/* Dynamic Title */}
        <h2 className="text-center mb-4 text-info">
          {isEditMode ? '✏️ Edit Your Story' : '✍️ Write New Story'}
        </h2>

        <form onSubmit={handleSubmit}>
          
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-bold">Blog Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={blog.title}
              onChange={handleChange}
              placeholder="Enter a catchy title..."
              required
            />
          </div>

          {/* Image */}
          <div className="mb-3">
            <label className="form-label fw-bold">Image URL</label>
            <input
              type="text"
              className="form-control"
              name="image"
              value={blog.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control"
              rows="5"
              name="desc"
              value={blog.desc}
              onChange={handleChange}
              placeholder="Tell your story here..."
              required
            ></textarea>
          </div>

          {/* Buttons Layout */}
          <div className="d-flex gap-2 mt-4">
            <button type="submit" className="btn btn-info px-4 fw-bold text-dark flex-grow-1">
              {isEditMode ? 'Update Blog' : 'Publish Blog'}
            </button>

            {/* Delete Button sirf tabhi dikhega jab pehle se bana hua blog edit ho raha ho */}
            {isEditMode && (
              <button type="button" className="btn btn-outline-danger px-4" onClick={handleDelete}>
                Delete
              </button>
            )}

            <button type="button" className="btn btn-secondary px-4" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default WriteBlog;