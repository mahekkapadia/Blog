import { useState } from "react";

function Insert({ onSave, editBlog, onCancel }) {
  // Fill the form with existing data when editing
  const [title, setTitle] = useState(editBlog ? editBlog.title : "");
  const [category, setCategory] = useState(
    editBlog ? editBlog.category : ""
  );
  const [author, setAuthor] = useState(editBlog ? editBlog.author : "");
  const [image, setImage] = useState(editBlog ? editBlog.image : "");
  const [description, setDescription] = useState(
    editBlog ? editBlog.description : ""
  );

  // Run when the form is submitted
  function handleSubmit(event) {
    event.preventDefault();

    const blog = {
      id: editBlog ? editBlog.id : null,
      title: title,
      category: category,
      author: author,
      image: image,
      description: description,
    };

    onSave(blog);
  }

  return (
    <div className="container py-5">
      <div className="form-container mx-auto p-4 rounded shadow-sm">
        <h2 className="mb-4">
          {editBlog ? "Edit Blog" : "Add New Blog"}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Blog title */}
          <div className="mb-3">
            <label className="form-label">Blog Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter blog title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              required
            >
              <option value="">Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Author */}
          <div className="mb-3">
            <label className="form-label">Author Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter author name"
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              required
            />
          </div>

          {/* Image URL */}
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="url"
              className="form-control"
              placeholder="Paste an image URL (optional)"
              value={image}
              onChange={(event) => setImage(event.target.value)}
            />

            {image && (
              <img
                src={image}
                alt="Blog preview"
                className="img-thumbnail mt-3"
                style={{ maxHeight: "180px" }}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
                onLoad={(event) => {
                  event.currentTarget.style.display = "block";
                }}
              />
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="5"
              placeholder="Write your blog description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-dark me-2">
            {editBlog ? "Update Blog" : "Save Blog"}
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Insert;