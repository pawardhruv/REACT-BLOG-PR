import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const [blogs, setBlogs] = useState([]);

  // Fetch Blogs
  useEffect(() => {

    fetch('http://localhost:3000/blogs')
      .then((res) => res.json())
      .then((data) => {

        if (Array.isArray(data)) {
          setBlogs(data);
        }

      })
      .catch((err) => console.log(err));

  }, []);

  // Delete Blog
  const handleDelete = (id) => {

    const confirmDelete = window.confirm("Do you want to delete this blog?");

    if (confirmDelete) {

      fetch(`http://localhost:3000/blogs/${id}`, {
        method: 'DELETE'
      })
        .then(() => {

          // Remove deleted blog from UI
          const updatedBlogs = blogs.filter((item) => item.id !== id);

          setBlogs(updatedBlogs);

          alert("Blog Deleted Successfully");
        })
        .catch((err) => console.log(err));
    }
  };

  return (

    <div className="container mt-5">

      {/* Heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Admin Dashboard</h2>

        <Link to="/create" className="btn btn-success">
          Add New Blog
        </Link>

      </div>

      {/* Total Blogs Card */}
      <div className="card shadow-sm mb-4">

        <div className="card-body">

          <h5>Total Blogs</h5>

          <h3>{blogs.length}</h3>

        </div>

      </div>

      {/* Blog Table */}
      <div className="card shadow">

        <div className="card-body">

          <table className="table table-bordered table-hover align-middle">

            <thead className="table-dark">

              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>

            </thead>

            <tbody>

              {blogs.length > 0 ? (

                blogs.map((item) => (

                  <tr key={item.id}>

                    <td>{item.id}</td>

                    <td>
                      <img
                        src={item.image}
                        alt="blog"
                        width="70"
                        height="50"
                        style={{
                          objectFit: 'cover',
                          borderRadius: '5px'
                        }}
                      />
                    </td>

                    <td>{item.title}</td>

                    <td>{item.date}</td>

                    <td>

                      <div className="d-flex gap-2">

                        <Link
                          to={`/edit/${item.id}`}
                          className="btn btn-primary btn-sm"
                        >
                          Edit
                        </Link>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))

              ) : (

                <tr>
                  <td colSpan="5" className="text-center">
                    No Blogs Found
                  </td>
                </tr>

              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;