// src/pages/LandingPage.jsx
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-red-500">
            🎬 MovieMate
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
            Build your ultimate movie watchlist, rate your favorites, and share them with the world. Discover what everyone’s watching — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 transition px-8 py-3 rounded-full font-semibold"
            >
              Get Started Free
            </Link>
            <Link
              to="/public"
              className="border border-red-600 hover:bg-red-600 transition px-8 py-3 rounded-full font-semibold"
            >
              Explore Public Feed
            </Link>
          </div>
        </div>

        <div className="mt-16 max-w-4xl w-full">
          <img
            src="https://images.unsplash.com/photo-1606480721854-f2a3f7d8cb6b?auto=format&fit=crop&w=1450&q=80"
            alt="Movies preview"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>
      </div>

      {/* Trusted By Section */}
      <div className="px-6 py-12 bg-zinc-900 text-center">
        <p className="text-gray-400 mb-6 uppercase tracking-widest text-sm">
          Trusted by Movie Fans Worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <span className="text-gray-500 text-lg font-semibold">Netflix Lovers</span>
          <span className="text-gray-500 text-lg font-semibold">Prime Watchers</span>
          <span className="text-gray-500 text-lg font-semibold">Film Buffs</span>
          <span className="text-gray-500 text-lg font-semibold">Indie Fans</span>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-500">
          📽️ Everything you need for your watchlist
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          MovieMate helps you track, review, and share your favorite films effortlessly.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-red-500">💾 Save & Organize</h3>
            <p className="text-gray-400">
              Create your own watchlists, mark movies as watched or to-watch, and never lose track.
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-red-500">⭐ Rate & Review</h3>
            <p className="text-gray-400">
              Leave your personal rating & review for each movie — build your own movie diary.
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-red-500">🌍 Share & Discover</h3>
            <p className="text-gray-400">
              Make your watchlists public and discover new gems from other film lovers.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900 text-center py-6 text-gray-500">
        <p className="text-sm">
          © {new Date().getFullYear()} MovieMate. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
