import { Link, useLocation } from "react-router-dom";
import { Home, Search, Globe, User, LogOut } from "lucide-react";

const Sidebar = ({ handleLogout, username }) => {
  const location = useLocation();
  console.log("✅ [Sidebar] username:", username);

  const linkClasses = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded hover:bg-zinc-800 transition ${
      location.pathname === path ? "bg-zinc-800 text-red-500" : "text-gray-300"
    }`;

  return (
    <aside className="fixed top-0 left-0 h-full w-60 bg-[#0d0d0d] border-r border-zinc-800 hidden md:flex flex-col justify-between">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-500 mb-8">🎬 MovieMate</h1>
        <nav className="space-y-2">
          <Link to="/dashboard" className={linkClasses("/dashboard")}>
            <Home size={18} /> Dashboard
          </Link>
          <Link to="/search" className={linkClasses("/search")}>
            <Search size={18} /> Search
          </Link>
          <Link to="/public" className={linkClasses("/public")}>
            <Globe size={18} /> Public Feed
          </Link>
          {username && (
            <Link to={`/user/${username}`} className={linkClasses(`/user/${username}`)}>
              <User size={18} /> My Public Watchlist
            </Link>
          )}
        </nav>
      </div>
      <div className="p-6 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
