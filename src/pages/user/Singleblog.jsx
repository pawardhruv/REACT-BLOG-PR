import React, { useEffect, useState } from 'react';

import { useParams, Link } from 'react-router-dom';

const SingleBlog = () => {

  const { id } = useParams();

  const [blog, setBlog] = useState(null);

  // Fetch Single Blog
  useEffect(() => {

    fetch(`http://localhost:3000/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data);
      })
      .catch((err) => console.log(err));

  }, [id]);

  // Loading
  if (!blog) {
    return (
      <div className="text-center mt-5">
        <h3>Loading Blog...</h3>
      </div>
    );
  }

  return (

    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: '#f5efe6',
        minHeight: '100vh'
      }}
    >

      <div className="container">

      
        <Link
          to="/"
          className="btn mb-4"
          style={{
            backgroundColor: '#6f4e37',
            color: 'white',
            borderRadius: '10px',
            padding: '8px 20px'
          }}
        >
          ← Back To Blogs
        </Link>

      
        <div
          className="card border-0"
          style={{
            backgroundColor: '#fffaf3',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}
        >

        
          <img
            src={blog.image}
            alt="blog"
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover'
            }}
          />

          
          <div className="p-5">

            <small
              style={{
                color: '#9c7c5d',
                fontWeight: '500',
                fontSize: '15px'
              }}
            >
              Published On : {blog.date}
            </small>

            <h1
              className="mt-3 mb-4"
              style={{
                color: '#4b2e2e',
                fontWeight: 'bold',
                fontFamily: 'Georgia'
              }}
            >
              {blog.title}
            </h1>

            <p
              style={{
                color: '#5f4b32',
                lineHeight: '2',
                fontSize: '18px',
                textAlign: 'justify'
              }}
            >
              {blog.desc}
            </p>

          </div>

        </div>

      </div>

    </div>

  );
};

export default SingleBlog;