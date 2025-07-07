import { useState } from "react";
import axios from "axios";
import { addMovie } from "../services/movie";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=cc87fd86&s=${query}`
      );
      setResults(res.data.Search || []);
    } catch (err) {
      console.error("Search failed:", err);
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
      alert("Movie added to watchlist!");
    } catch (err) {
      console.error("Error adding movie:", err);
      alert("You must be logged in to add movies.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16 md:pl-60 p-6">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-red-500 mb-4">🔍 Search Movies</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
            className="flex-grow px-3 py-2 bg-[#121212] border border-gray-600 rounded text-white outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Search
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {results.map((movie) => (
            <div key={movie.imdbID} className="bg-[#1a1a1a] p-4 rounded">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="mb-2 w-full h-60 object-cover rounded"
              />
              <h3 className="text-lg font-semibold">{movie.Title}</h3>
              <p className="text-sm text-gray-400">{movie.Year}</p>
              <button
                onClick={() => handleAdd(movie)}
                className="mt-3 bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
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
