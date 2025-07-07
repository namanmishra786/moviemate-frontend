import { useState } from "react";

const AddMovieModal = ({ isOpen, onClose, onAdd }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    rating: "",
    watched: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ title: "", description: "", rating: "", watched: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-[#1a1a1a] text-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold text-red-500 mb-4">➕ Add New Movie</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full p-2 bg-black border border-gray-700 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 bg-black border border-gray-700 rounded"
          ></textarea>
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-10)"
            value={form.rating}
            onChange={handleChange}
            min="0"
            max="10"
            className="w-full p-2 bg-black border border-gray-700 rounded"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="watched"
              checked={form.watched}
              onChange={handleChange}
            />
            <span>Watched</span>
          </label>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMovieModal;
