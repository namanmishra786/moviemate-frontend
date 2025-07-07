import { useNavigate } from "react-router-dom";

const Navbar = ({ username }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 md:left-60 right-0 h-16 bg-black border-b border-zinc-800 flex items-center justify-between px-6 z-40">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-red-500 transition"
      >
        ← Go Back
      </button>
      <div className="flex items-center gap-4 ml-auto">
        {username && (
          <span className="text-sm text-gray-400">Hi, {username}</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
