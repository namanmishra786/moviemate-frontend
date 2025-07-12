import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-[Outfit]">
      {/* ✅ Hero Section */}
      <section className="flex flex-col items-center justify-center px-6 py-32 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-red-500">
          🎬 MovieMate
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl">
          Track what you watch. Discover new favorites. Share your taste with the world.
        </p>
        <Link
          to="/register"
          className="bg-red-600 hover:bg-red-700 transition px-10 py-4 rounded-full font-semibold shadow-md hover:shadow-lg"
        >
          Join MovieMate Free
        </Link>
      </section>

      {/* ✅ Trusted By */}
      <section className="px-6 py-16 bg-zinc-900 text-center">
        <p className="text-gray-400 mb-6 uppercase tracking-widest text-sm">
          Loved by movie lovers worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10">
          <span className="text-gray-500 text-lg font-semibold">Film Buffs</span>
          <span className="text-gray-500 text-lg font-semibold">Critics</span>
          <span className="text-gray-500 text-lg font-semibold">Casual Fans</span>
          <span className="text-gray-500 text-lg font-semibold">Indie Watchers</span>
        </div>
      </section>

      {/* ✅ Features */}
      <section className="px-6 py-20 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-500">
          🎥 All your movie life, in one place.
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          From your first watchlist to your last review, MovieMate is your personal film companion.
        </p>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-red-500">💾 Save & Organize</h3>
            <p className="text-gray-400">
              Create custom watchlists, mark movies as watched, and sort by genre, year, or rating.
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-red-500">⭐ Rate & Review</h3>
            <p className="text-gray-400">
              Log your ratings and reviews, build your own movie diary — your taste, your way.
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2 text-red-500">🌍 Share & Discover</h3>
            <p className="text-gray-400">
              Make your lists public, follow friends, and see what other movie lovers recommend.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ How It Works */}
      <section className="px-6 py-20 bg-zinc-900 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-500">
          📌 How MovieMate Works
        </h2>
        <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
          Get started in seconds — and enjoy movies like never before.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          <div className="p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">1️⃣ Create an Account</h3>
            <p className="text-gray-400">
              Sign up for free and start building your movie library instantly.
            </p>
          </div>
          <div className="p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">2️⃣ Add Movies</h3>
            <p className="text-gray-400">
              Search for your favorite films and add them to your watchlists.
            </p>
          </div>
          <div className="p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-2">3️⃣ Rate & Share</h3>
            <p className="text-gray-400">
              Leave ratings, write reviews, and share your lists with friends.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Call to Action */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-500">
          🚀 Ready to build your watchlist?
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          MovieMate is free forever — start your movie journey today.
        </p>
        <Link
          to="/register"
          className="bg-red-600 hover:bg-red-700 transition px-10 py-4 rounded-full font-semibold shadow-md hover:shadow-lg"
        >
          Get Started
        </Link>
      </section>

      {/* ✅ Footer */}
      <footer className="bg-zinc-900 text-center py-8 text-gray-500">
        <p className="text-sm">
          © {new Date().getFullYear()} MovieMate. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
