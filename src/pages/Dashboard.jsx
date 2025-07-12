import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import EditMovieModal from "../components/EditMovieModal";
import { useMovies } from "../hooks/useMovies";
import API from "../services/api";
import { Menu } from "lucide-react";

/**
 * Dashboard component:
 * - Shows user's movie watchlist
 * - Handles sidebar toggle for mobile
 * - Uses custom useMovies hook for data
 * - Manages edit modal for updating movies or public flag
 */
const Dashboard = ({ username }) => {
  const { movies, loading, error, removeMovie, fetchMovies } = useMovies();

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  /**
   * Save changes from EditMovieModal.
   * Handles both updating public flag and full edits.
   */
  const handleSaveEdit = async (updatedData) => {
    try {
      await API.put(`/movies/${selectedMovie._id}`, updatedData);
      setSelectedMovie(null);
      fetchMovies();
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* ✅ Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className="absolute inset-0 bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
        <div className="w-64 bg-gray-800 h-full">
          <Sidebar handleLogout={handleLogout} username={username} />
        </div>
      </div>

      {/* ✅ Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar handleLogout={handleLogout} username={username} />
      </div>

      <div className="flex flex-col flex-1">
        {/* ✅ Mobile Hamburger */}
        <div className="md:hidden p-4">
          <button onClick={toggleSidebar} className="p-2 bg-gray-700 rounded">
            <Menu size={24} />
          </button>
        </div>

        {/* ✅ Navbar */}
        <Navbar username={username} />

        {/* ✅ Main Content */}
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
                  onDelete={removeMovie}
                  onEdit={() => setSelectedMovie(movie)}
                />
              ))}
            </div>
          )}
        </main>

        {/* ✅ Edit Movie Modal */}
        {selectedMovie && (
          <EditMovieModal
            movie={selectedMovie}
            onSave={handleSaveEdit}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
