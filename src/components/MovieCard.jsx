import { Trash2, Pencil } from "lucide-react";

/**
 * MovieCard component
 * Shows movie poster, title, public status, rating
 * Provides buttons for Delete and Edit actions
 */
const MovieCard = ({ movie, onDelete, onEdit }) => {
  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {movie.poster && (
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
      )}

      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
          <p className="text-sm text-gray-400 mb-1">
            🎯 Public: {movie.public ? "Yes" : "No"}
          </p>
          <p className="text-sm text-gray-400 mb-2">
            ⭐ Rating: {movie.rating || "N/A"}
          </p>
          {movie.review && (
            <p className="text-sm text-gray-500 italic mt-2">
              "{movie.review}"
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() => onDelete(movie._id)}
            className="p-3 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
          >
            <Trash2 size={18} />
          </button>

          <button
            onClick={() => onEdit(movie)}
            className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
          >
            <Pencil size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
