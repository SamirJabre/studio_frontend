import React, { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { FaTimes, FaPalette, FaRocket } from "react-icons/fa";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

function ProjectConfiguration({ isOpen, onClose, onSave }) {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    color: "#5664F5",
    nodes: [],
    edges: [],
    metadata: {
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      version: 1,
    },
  });

  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleColorChange = (color) => {
    setProjectData((prev) => ({
      ...prev,
      color: color,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectData.title.trim() && projectData.description.trim()) {
      onSave(projectData);
      // Reset form
      setProjectData({
        title: "",
        description: "",
        color: "#5664F5",
      });
      setShowColorPicker(false);
      handleClose();
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleCancel = () => {
    // Reset form
    setProjectData({
      title: "",
      description: "",
      color: "#5664F5",
    });
    setShowColorPicker(false);
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black z-50 p-4 flex items-center justify-center transition-all duration-300 ${
        isAnimating ? "bg-opacity-60 backdrop-blur-sm" : "bg-opacity-0"
      }`}
      onClick={handleCancel}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl lg:max-w-3xl overflow-hidden transform transition-all duration-300 ${
          isAnimating
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with animated gradient */}
        <div className="relative bg-gradient-to-r from-[#5664F5] via-[#4f5ce5] to-[#4451d9] px-6 sm:px-8 py-5 sm:py-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-shimmer"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <FaRocket className="text-white text-lg sm:text-xl" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  Create New Project
                </h2>
                <p className="text-xs sm:text-sm text-white text-opacity-90 mt-0.5">
                  Let's build something amazing
                </p>
              </div>
            </div>
            <button
              onClick={handleCancel}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200 hover:rotate-90"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Project Title */}
            <div className="md:col-span-2">
              <label
                htmlFor="title"
                className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2"
              >
                <span className="w-1.5 h-1.5 bg-[#5664F5] rounded-full"></span>
                Project Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={projectData.title}
                onChange={handleInputChange}
                required
                placeholder="My Awesome Project"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5664F5] focus:border-[#5664F5] outline-none transition-all duration-200 hover:border-gray-300 text-base"
              />
            </div>

            {/* Project Description */}
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-2"
              >
                <span className="w-1.5 h-1.5 bg-[#5664F5] rounded-full"></span>
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={projectData.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Describe what makes your project special..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5664F5] focus:border-[#5664F5] outline-none transition-all duration-200 hover:border-gray-300 resize-none text-base"
              />
            </div>

            {/* Color Accent */}
            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                <span className="w-1.5 h-1.5 bg-[#5664F5] rounded-full"></span>
                <FaPalette className="text-[#5664F5]" />
                Color Accent
              </label>

              {/* Quick Color Presets */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { color: "#5664F5", name: "Indigo" },
                  { color: "#10B981", name: "Emerald" },
                  { color: "#F59E0B", name: "Amber" },
                  { color: "#EF4444", name: "Red" },
                  { color: "#8B5CF6", name: "Purple" },
                  { color: "#06B6D4", name: "Cyan" },
                  { color: "#EC4899", name: "Pink" },
                  { color: "#14B8A6", name: "Teal" },
                ].map(({ color, name }) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorChange(color)}
                    className={`group relative w-12 h-12 rounded-xl transition-all duration-200 hover:scale-110 ${
                      projectData.color === color
                        ? "ring-4 ring-offset-2 ring-gray-900 scale-110"
                        : "hover:ring-2 hover:ring-offset-2 hover:ring-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    title={name}
                  >
                    {projectData.color === color && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full shadow-lg"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Color Section */}
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-16 h-16 rounded-xl shadow-lg border-4 border-white cursor-pointer hover:scale-105 transition-transform duration-200"
                    style={{ backgroundColor: projectData.color }}
                    onClick={() => setShowColorPicker(!showColorPicker)}
                  />
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">
                      Custom Hex Code
                    </label>
                    <input
                      type="text"
                      value={projectData.color}
                      onChange={(e) => handleColorChange(e.target.value)}
                      placeholder="#5664F5"
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5664F5] focus:border-[#5664F5] outline-none transition-all font-mono text-sm uppercase hover:border-gray-300"
                      maxLength={7}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      showColorPicker
                        ? "bg-[#5664F5] text-white"
                        : "bg-white border-2 border-gray-300 text-gray-700 hover:border-[#5664F5]"
                    }`}
                  >
                    {showColorPicker ? "Close" : "Pick"}
                  </button>
                </div>

                {/* Color Picker */}
                {showColorPicker && (
                  <div className="animate-fadeIn">
                    <HexColorPicker
                      color={projectData.color}
                      onChange={handleColorChange}
                      className="w-full !h-48 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t-2 border-gray-100">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#5664F5] to-[#4451d9] text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-[#5664F5]/50 hover:-translate-y-1 transition-all duration-200 text-base flex items-center justify-center gap-2"
            >
              <FaRocket />
              Create Project
            </button>
          </div>
        </form>
      </div>

      {/* Add custom animation styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `,
        }}
      />
    </div>
  );
}

export default ProjectConfiguration;
