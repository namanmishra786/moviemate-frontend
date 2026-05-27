import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserWatchlist = () => {
  const { username } = useParams();
  const lowercaseUsername = username?.toLowerCase();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://moviemate-beckend.onrender.com/api/movies/public/${lowercaseUsername}`
        );
        setMovies(res.data);
        setError(false);
      } catch (err) {
        console.error("❌ Error fetching public movies:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (lowercaseUsername) fetchMovies();
  }, [lowercaseUsername]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">
        🎥 {lowercaseUsername}'s Public Watchlist
      </h1>

      <div className="mb-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          🔗 Copy Shareable Link
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">⏳ Loading watchlist...</p>
      ) : error ? (
        <p className="text-red-500">
          ❌ Could not load this user's watchlist.
        </p>
      ) : movies.length === 0 ? (
        <p className="text-gray-500">
          👀 This user hasn’t added any public movies yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {movies.map((movie) => (
            <li
              key={movie._id}
              className="bg-white border p-4 rounded shadow"
            >
              <h2 className="text-lg font-semibold">🎬 {movie.title}</h2>
              {movie.description && (
                <p className="text-gray-600 mt-1">{movie.description}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserWatchlist;
