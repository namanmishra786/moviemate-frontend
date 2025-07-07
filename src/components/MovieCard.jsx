import { Star, Trash2 } from "lucide-react";

const MovieCard = ({ movie, onDelete }) => {
  return (
    <div className="bg-zinc-900 text-white rounded-xl shadow-md p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h3 className="text-xl font-bold mb-1">{movie.title}</h3>
        <p className="text-sm text-gray-400">
          Watched: <span className="font-medium">{movie.watched ? "Yes" : "No"}</span>
        </p>
        <div className="flex items-center gap-1 text-yellow-400 mt-1">
          <Star size={16} />
          <span>{movie.rating || "N/A"}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onDelete(movie._id)}
          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md transition"
        >
          <Trash2 size={16} />
          Delete
        </button>
        {/* Add Edit button here later */}
      </div>
    </div>
  );
};

export default MovieCard;
