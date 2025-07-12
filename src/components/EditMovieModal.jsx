import { useState, useEffect } from "react";

/**
 * EditMovieModal
 * - Allows user to edit movie details or toggle public flag.
 * - Controlled by parent (Dashboard).
 */
const EditMovieModal = ({ movie, onSave, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    rating: "",
    public: false,
  });

  // Populate form when movie changes
  useEffect(() => {
    if (movie) {
      setForm({
        title: movie.title || "",
        description: movie.description || "",
        rating: movie.rating || "",
        public: movie.public || false,
      });
    }
  }, [movie]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!movie) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-zinc-900 p-7 rounded-lg w-full max-w-md">
        <h3 className="text-2xl mb-6 font-semibold">
          Edit "{movie.title}"
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 bg-black border border-gray-700 rounded"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 bg-black border border-gray-700 rounded"
          ></textarea>

          <input
            type="number"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating"
            min="0"
            max="10"
            className="w-full p-2 bg-black border border-gray-700 rounded"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="public"
              checked={form.public}
              onChange={handleChange}
            />
            Make Public
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-600 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMovieModal;
