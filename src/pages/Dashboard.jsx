import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getMovies, deleteMovie } from "../services/movie";
import { Trash2, Pencil, Menu } from "lucide-react";
import axios from "axios";

const MovieCard = ({ movie, onDelete, onEdit }) => (
  <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
    {movie.poster && (
      <img src={movie.poster} alt={movie.title} className="w-full h-64 object-cover" />
    )}
    <div className="p-5 flex flex-col justify-between flex-1">
      <div>
        <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-400 mb-1">🎯 Public: {movie.public ? "Yes" : "No"}</p>
        <p className="text-sm text-gray-400 mb-2">⭐ Rating: {movie.rating || "N/A"}</p>
        {movie.review && (
          <p className="text-sm text-gray-500 italic mt-2">"{movie.review}"</p>
        )}
      </div>
      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => onDelete(movie._id)}
          className="p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
        >
          <Trash2 size={18} />
        </button>
        <button
          onClick={() => onEdit(movie)}
          className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
        >
          <Pencil size={18} />
        </button>
      </div>
    </div>
  </div>
);

const Dashboard = ({ username }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data = await getMovies();
      setMovies(data);
    } catch {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteMovie(id);
    fetchMovies();
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `http://localhost:5000/api/movies/${selectedMovie._id}/public`,
        { public: isPublic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSelectedMovie(null);
      fetchMovies();
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 z-50 md:hidden ${isSidebarOpen ? "block" : "hidden"}`}>
        <div className="absolute inset-0 bg-black opacity-50" onClick={toggleSidebar}></div>
        <div className="w-64 bg-gray-800 h-full">
          <Sidebar handleLogout={handleLogout} username={username} />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar handleLogout={handleLogout} username={username} />
      </div>

      <div className="flex flex-col flex-1">
        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden p-4">
          <button onClick={toggleSidebar} className="p-2 bg-gray-700 rounded">
            <Menu size={24} />
          </button>
        </div>

        {/* Navbar */}
        <Navbar username={username} />

        {/* Main Content */}
        <main className="flex-1 pt-6 pl-4 md:pl-4 px-4 py-4">
          <h2 className="text-3xl font-bold mb-6">🎬 My Watchlist</h2>
          {error && <p className="text-red-400 mb-4">{error}</p>}
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : movies.length === 0 ? (
            <p className="text-gray-400">No movies yet. Add some!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onDelete={handleDelete}
                  onEdit={(m) => {
                    setSelectedMovie(m);
                    setIsPublic(m.public);
                  }}
                />
              ))}
            </div>
          )}
        </main>

        {/* Modal for Editing Movie */}
        {selectedMovie && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-zinc-900 p-7 rounded-lg w-full max-w-md">
              <h3 className="text-2xl mb-6 font-semibold">
                Edit "{selectedMovie.title}"
              </h3>
              <label className="flex items-center gap-3 mb-6">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                <span className="text-lg">Make Public</span>
              </label>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setSelectedMovie(null)}
                  className="px-5 py-2 bg-gray-600 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
