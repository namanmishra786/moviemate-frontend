import { useState } from "react";
import axios from "axios";
import { addMovie } from "../services/movie";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=cc87fd86&s=${query}`
      );
      if (res.data.Response === "True") {
        setResults(res.data.Search);
      } else {
        setResults([]);
        setError("No results found.");
      }
    } catch (err) {
      console.error("Search failed:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (movie) => {
    const newMovie = {
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      watched: false,
      rating: null,
      review: "",
    };

    try {
      await addMovie(newMovie);
      alert("✅ Movie added to your watchlist!");
    } catch (err) {
      console.error("Add failed:", err);
      alert("❌ You must be logged in to add movies.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16 md:pl-60 p-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-red-500 mb-6">
          🔍 Search Movies
        </h2>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-grow px-4 py-2 bg-[#121212] border border-gray-600 rounded text-white outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={!query.trim() || loading}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="grid sm:grid-cols-2 gap-6">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-[#1a1a1a] h-80 rounded"
              ></div>
            ))}

          {!loading &&
            results.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-[#1a1a1a] p-4 rounded shadow-md"
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.Title}
                  className="mb-3 w-full h-60 object-cover rounded"
                />
                <h3 className="text-lg font-semibold">{movie.Title}</h3>
                <p className="text-sm text-gray-400">{movie.Year}</p>
                <button
                  onClick={() => handleAdd(movie)}
                  className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                >
                  ➕ Add to Watchlist
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
