function Manage({ blogs, onEdit, onDelete }) {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Manage Blogs</h2>

      {/* Blog statistics */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-center p-4 shadow-sm">
            <h5>Total Blogs</h5>
            <h2>{blogs.length}</h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center p-4 shadow-sm">
            <h5>Total Categories</h5>
            <h2>
              {[...new Set(blogs.map((blog) => blog.category))].length}
            </h2>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center p-4 shadow-sm">
            <h5>Blogs With Images</h5>
            <h2>{blogs.filter((blog) => blog.image).length}</h2>
          </div>
        </div>
      </div>

      {/* Blog table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Sr. No.</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No blogs to manage yet.
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <tr key={blog.id}>
                  <td>{index + 1}</td>

                  <td>
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="manage-image"
                      />
                    ) : (
                      <span className="text-muted">No image</span>
                    )}
                  </td>

                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.author}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2 mb-1"
                      onClick={() => onEdit(blog)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm mb-1"
                      onClick={() => onDelete(blog.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Manage;
