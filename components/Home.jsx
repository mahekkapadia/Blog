import { useState } from "react";
import Insert from "./Insert";
import Manage from "./Manage";

function Home() {
  // Get saved blogs from localStorage
  const [blogs, setBlogs] = useState(() => {
    const savedBlogs = localStorage.getItem("myBlogs");
    return savedBlogs ? JSON.parse(savedBlogs) : [];
  });

  // Decide which page to display
  const [page, setPage] = useState("home");

  // Store the blog that we want to edit
  const [editBlog, setEditBlog] = useState(null);

  // Save blogs in state and localStorage
  function saveBlogs(updatedBlogs) {
    setBlogs(updatedBlogs);
    localStorage.setItem("myBlogs", JSON.stringify(updatedBlogs));
  }

  // Add a new blog or update an existing blog
  function handleSave(blog) {
    let updatedBlogs;

    if (editBlog) {
      updatedBlogs = blogs.map((item) =>
        item.id === blog.id ? blog : item
      );
    } else {
      updatedBlogs = [...blogs, { ...blog, id: Date.now() }];
    }

    saveBlogs(updatedBlogs);
    setEditBlog(null);
    setPage("home");
  }

  // Open the form for a new blog
  function handleInsert() {
    setEditBlog(null);
    setPage("insert");
  }

  // Open the form with the selected blog's details
  function handleEdit(blog) {
    setEditBlog(blog);
    setPage("insert");
  }

  // Delete a blog
  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (confirmDelete) {
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      saveBlogs(updatedBlogs);
    }
  }

  return (
    <div>
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span
          className="navbar-brand fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => setPage("home")}
        >
          MyBlog
        </span>

        <div className="ms-auto d-flex gap-2">
          <button
            className="btn btn-outline-light"
            onClick={() => setPage("home")}
          >
            Home
          </button>

          <button className="btn btn-outline-light" onClick={handleInsert}>
            Insert
          </button>

          <button
            className="btn btn-outline-light"
            onClick={() => setPage("manage")}
          >
            Manage
          </button>
        </div>
      </nav>

      {/* Home page */}
      {page === "home" && (
        <div className="container py-5">
          <div className="welcome-section text-center p-5 mb-5 rounded">
            <h1>Welcome to MyBlog</h1>
            <p className="lead">
              Discover stories, ideas, and inspiration.
            </p>

            <button className="btn btn-dark" onClick={handleInsert}>
              + Add New Blog
            </button>
          </div>

          <h2 className="mb-4">Latest Blogs</h2>

          <div className="row">
            {blogs.length === 0 ? (
              <div className="col-12 text-center py-5">
                <h5>No blogs available yet.</h5>
                <p>Add your first blog to get started!</p>
              </div>
            ) : (
              blogs.map((blog) => (
                <div className="col-md-4 mb-4" key={blog.id}>
                  <div className="card h-100 shadow-sm">
                    {blog.image && (
                      <img
                        src={blog.image}
                        className="card-img-top blog-image"
                        alt={blog.title}
                      />
                    )}

                    <div className="card-body">
                      <span className="badge bg-success mb-2">
                        {blog.category}
                      </span>

                      <h5 className="card-title">{blog.title}</h5>

                      <p className="text-muted">
                        By {blog.author}
                      </p>

                      <p className="card-text">{blog.description}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Insert page */}
      {page === "insert" && (
        <Insert
          onSave={handleSave}
          editBlog={editBlog}
          onCancel={() => {
            setEditBlog(null);
            setPage("home");
          }}
        />
      )}

      {/* Manage page */}
      {page === "manage" && (
        <Manage
          blogs={blogs}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default Home;
