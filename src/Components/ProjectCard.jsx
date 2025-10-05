import React, { useState } from "react";
import {
  FaFolder,
  FaCalendarAlt,
  FaEllipsisV,
  FaTrash,
  FaCopy,
} from "react-icons/fa";

function ProjectCard({
  title = "Project Title",
  description = "This is a sample project description that shows what the project is about.",
  lastModified = "2 days ago",
  color = "#5664F5",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDelete = () => {
    // Add delete logic here
    console.log("Delete project:", title);
    setIsMenuOpen(false);
  };

  const handleDuplicate = () => {
    // Add duplicate logic here
    console.log("Duplicate project:", title);
    setIsMenuOpen(false);
  };

  return (
    <div className="group w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 overflow-hidden relative">
      {/* Header with color accent */}
      <div className="h-2 w-full" style={{ backgroundColor: color }}></div>

      {/* Card Content */}
      <div className="p-4 sm:p-6">
        {/* Title and Menu */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#5664F5] transition-colors duration-200 line-clamp-2 flex-1 pr-2">
            {title}
          </h3>

          {/* 3-dot menu */}
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

            {/* Dropdown Menu */}
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
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Project Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-[#5664F5] to-[#4451d9] mb-4 mx-auto">
          <FaFolder className="text-white text-lg" />
        </div>

        {/* Last Modified */}
        <div className="text-xs text-gray-500">
          <div className="flex items-center gap-2 justify-center">
            <FaCalendarAlt className="text-gray-400" />
            <span>Updated {lastModified}</span>
          </div>
        </div>
      </div>

      {/* Hover Action */}
      <div className="px-4 sm:px-6 pb-4">
        <button className="w-full py-2 text-sm font-medium text-[#5664F5] border border-[#5664F5] rounded-lg hover:bg-[#5664F5] hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          View Project
        </button>
      </div>

      {/* Click outside to close menu */}
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
