import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const UserWatchlist = () => {
  const { username: routeUsername } = useParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  let localUsername = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      localUsername = decoded.username || decoded.email || "";
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/movies/public/${routeUsername}`);
        setMovies(res.data);
      } catch (err) {
        console.error(err);
        setError("Could not load this user's watchlist.");
      }
    };

    fetchUserMovies();
  }, [routeUsername]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar handleLogout={handleLogout} username={localUsername} />
      <div className="flex flex-col flex-1">
        <Navbar username={localUsername} />
        <main className="flex-1 pt-16 md:pl-60 p-6">
          <h2 className="text-3xl font-bold text-red-500 mb-4">
            🎥 {routeUsername}'s Public Watchlist
          </h2>

          {error && <p className="text-red-400 mb-4">{error}</p>}

          {movies.length === 0 ? (
            <p className="text-gray-400">
              This user hasn’t shared any movies yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {movies.map((movie) => (
                <div
                  key={movie._id}
                  className="bg-[#1a1a1a] rounded-xl p-4 shadow-md"
                >
                  <img
                    src={movie.poster || "https://via.placeholder.com/300x450"}
                    alt={movie.title}
                    className="w-full h-60 object-cover mb-3 rounded"
                  />
                  <h3 className="text-xl font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-400">📅 {movie.year}</p>
                  {movie.review && (
                    <p className="text-sm text-gray-500 italic mt-1">
                      "{movie.review}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserWatchlist;
