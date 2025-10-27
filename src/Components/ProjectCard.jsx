import { useState } from "react";
import {
  FaFolder,
  FaCalendarAlt,
  FaEllipsisV,
  FaTrash,
  FaFileExport,
  FaCopy,
  FaClock,
} from "react-icons/fa";
import { useNavigate } from "react-router";

// Helper function to format date
const formatDate = (isoString) => {
  if (!isoString) return "N/A";

  const date = new Date(isoString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  // Less than a minute
  if (diffInSeconds < 60) {
    return "just now";
  }

  // Less than an hour
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }

  // Less than a day
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  // Less than a week
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  // Less than a month
  if (diffInSeconds < 2592000) {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  }

  // Otherwise show the date
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

function ProjectCard({
  id,
  title,
  description,
  metadata,
  color,
  onDelete,
  onDuplicate,
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setIsMenuOpen(false);
  };

  const handleDuplicate = () => {
    onDuplicate();
    setIsMenuOpen(false);
  };

  const handleExport = () => {
    console.log("Project Exported");
    setIsMenuOpen(false);
  };

  return (
    <div className="group w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 overflow-hidden relative flex flex-col">
      <div className="h-2 w-full" style={{ backgroundColor: color }}></div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#5664F5] transition-colors duration-200 line-clamp-2 flex-1 pr-2">
            {title}
          </h3>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
              aria-label="Project options"
            >
              <FaEllipsisV
                className="text-gray-400 hover:text-gray-600"
                size={14}
              />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 py-1 min-w-[120px]">
                <button
                  onClick={handleDuplicate}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                >
                  <FaCopy size={12} className="text-gray-500" />
                  Duplicate
                </button>
                <button
                  onClick={handleDelete}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
                >
                  <FaTrash size={12} className="text-red-500" />
                  Delete
                </button>
                <button
                  onClick={handleExport}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-blue-600"
                >
                  <FaFileExport size={12} className="text-blue-600" />
                  Export
                </button>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        <div className="flex-1"></div>

        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#5664F5] to-[#4451d9] mb-3 mx-auto">
          <FaFolder className="text-white text-lg" />
        </div>

        <div className="text-xs text-gray-500 mb-3 space-y-1.5">
          <div className="flex items-center gap-2 justify-center">
            <FaClock className="text-gray-400" />
            <span>Created {formatDate(metadata?.createdAt)}</span>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <FaCalendarAlt className="text-gray-400" />
            <span>Modified {formatDate(metadata?.lastModified)}</span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/editor/${id}`)}
          className="w-full py-2 text-sm font-medium text-[#5664F5] border border-[#5664F5] rounded-lg hover:bg-[#5664F5] hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0"
        >
          View Project
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default ProjectCard;
