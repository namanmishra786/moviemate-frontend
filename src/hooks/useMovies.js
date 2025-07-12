// src/hooks/useMovies.js

import { useState, useEffect } from "react";
import { getMovies, deleteMovie } from "../services/movie";

/**
 * Custom React hook for managing movies:
 * - Fetches movies for the logged-in user
 * - Handles delete
 * - Tracks loading & errors
 */
export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch movies from API
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data = await getMovies();
      setMovies(data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch:", err);
      setError("Could not load movies.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete movie by ID
  const removeMovie = async (id) => {
    try {
      await deleteMovie(id);
      fetchMovies();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  // ✅ Fetch movies on mount
  useEffect(() => {
    fetchMovies();
  }, []);

  return { movies, loading, error, fetchMovies, removeMovie };
};
