import { useEffect, useState } from "react";
import API from "../services/api"; // ✅ Use your API instance
import { Link } from "react-router-dom";

const PublicFeed = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublicFeed = async () => {
      try {
        const res = await API.get("/movies/public-feed"); // ✅ Uses your baseURL
        setMovies(res.data);
      } catch (err) {
        console.error(err);
        setError("Could not load public feed.");
      }
    };

    fetchPublicFeed();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-16 md:ml-60 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-red-500 mb-6">🌍 Public Feed</h2>

        {error && <p className="text-red-400 mb-4">{error}</p>}

        {movies.length === 0 ? (
          <p className="text-gray-400">
            No public movies yet. Be the first to share yours!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div
                key={movie._id}
                className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow hover:shadow-lg transition"
              >
                <img
                  src={movie.poster || "https://via.placeholder.com/300x450"}
                  alt={movie.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
                  <p className="text-xs text-gray-400 mb-1">
                    📅 {movie.year || "Unknown Year"}
                  </p>
                  <p className="text-xs text-gray-400">
                    👤 Shared by:{" "}
                    <Link
                      to={`/user/${movie.user.username}`}
                      className="underline text-red-500 hover:text-red-400"
                    >
                      {movie.user.username}
                    </Link>
                  </p>
                  {movie.review && (
                    <p className="text-xs text-gray-500 italic mt-2">
                      "{movie.review}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicFeed;
