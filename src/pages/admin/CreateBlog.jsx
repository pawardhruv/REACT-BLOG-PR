import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState(''); 
  const [image, setImage] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const today = new Date().toLocaleDateString('en-US', {
  
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const newBlog = {
      title: title,
      desc: desc,   
      image: image,  
      date: today
    };

    // json-server par data bhejna
    fetch('http://localhost:3000/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBlog)
    })
    .then(() => {
      alert('Blog Published Successfully! 🎉');
      navigate('/');
    })
    .catch(err => console.error("Blog add karne mein error:", err));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4 fw-bold">Write a New Story</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Blog Title</label>
          <input 
            type="text" 
            className="form-control" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Image URL</label>
          <input 
            type="text" 
            className="form-control" 
            placeholder="https://images.unsplash.com/..." 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Content / Description</label>
          <textarea 
            className="form-control" 
            rows="5" 
            value={desc} 
            onChange={(e) => setDesc(e.target.value)} 
            required 
          ></textarea>
        </div>
        <button type="submit" className="btn btn-dark w-100 fw-bold">Publish Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;