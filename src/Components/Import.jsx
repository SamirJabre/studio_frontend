import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { importProject } from "../Redux/Slices/projectsSlice";
import { useToast } from "../Context/ToastContext";
import {
  FaFileImport,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MdDescription } from "react-icons/md";

function Import() {
  const dispatch = useDispatch();
  const { showSuccess, showError } = useToast();
  const { importProjectLoading } = useSelector((state) => state.projects);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file) => {
    // Validate file type (JSON files for project import)
    if (file.type === "application/json" || file.name.endsWith(".json")) {
      setSelectedFile(file);
      setUploadStatus(null);
    } else {
      setUploadStatus("error");
      setSelectedFile(null);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async () => {
    if (selectedFile) {
      try {
        // Read the file content
        const fileContent = await selectedFile.text();
        const projectData = JSON.parse(fileContent);

        // Validate that it's a valid project structure
        if (!projectData || typeof projectData !== "object") {
          setUploadStatus("error");
          setErrorMessage("Invalid project file format.");
          showError("Invalid project file format.");
          return;
        }

        // Dispatch the import action
        const result = await dispatch(importProject({ projectData })).unwrap();

        if (result) {
          setUploadStatus("success");
          setErrorMessage("");
          showSuccess("Project imported successfully!");

          // Clear the file after 2 seconds on success
          setTimeout(() => {
            handleClear();
          }, 2000);
        }
      } catch (error) {
        console.error("Error importing project:", error);
        const errorMsg =
          error.message ||
          "Failed to import project. Please check the file format.";
        setUploadStatus("error");
        setErrorMessage(errorMsg);
        showError(errorMsg);
      }
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setUploadStatus(null);
    setErrorMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 sm:p-4 rounded-2xl shadow-lg">
              <FaFileImport className="text-2xl sm:text-3xl text-white" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Import Project
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Upload your project JSON file to import it into Studio
          </p>
        </div>

        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 transition-all duration-300 ${
            isDragging
              ? "border-blue-500 bg-blue-50 scale-105"
              : "border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {!selectedFile ? (
            <div className="text-center">
              <FaCloudUploadAlt
                className={`mx-auto text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 transition-colors duration-300 ${
                  isDragging ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
                Drop your file here
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                or
              </p>
              <button
                onClick={handleBrowseClick}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl sm:rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
              >
                Browse Files
              </button>
              <p className="text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">
                Supports: JSON files only
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {/* Selected File Info */}
              <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl border border-blue-100">
                <div className="flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 sm:p-3 rounded-xl">
                  <MdDescription className="text-xl sm:text-2xl text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-gray-800 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
                <button
                  onClick={handleClear}
                  className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors duration-200"
                >
                  <FaTimesCircle className="text-xl sm:text-2xl" />
                </button>
              </div>

              {/* Status Messages */}
              {uploadStatus === "success" && (
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl sm:rounded-2xl">
                  <FaCheckCircle className="text-lg sm:text-xl text-green-500 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-green-700 font-medium">
                    Project imported successfully!
                  </p>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl sm:rounded-2xl">
                  <FaTimesCircle className="text-lg sm:text-xl text-red-500 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-red-700 font-medium">
                    {errorMessage ||
                      "Invalid file type. Please upload a JSON file."}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleImport}
                  disabled={uploadStatus === "success" || importProjectLoading}
                  className="flex-1 px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl sm:rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  {importProjectLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Importing...</span>
                    </>
                  ) : (
                    "Import Project"
                  )}
                </button>
                <button
                  onClick={handleBrowseClick}
                  disabled={importProjectLoading}
                  className="flex-1 px-6 py-2.5 sm:py-3 bg-white border-2 border-gray-300 text-gray-700 font-medium rounded-xl sm:rounded-2xl hover:border-blue-400 hover:bg-gray-50 transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Choose Different File
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl sm:rounded-3xl border border-blue-100">
          <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">
            📋 Import Guidelines
          </h4>
          <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5 sm:space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Only JSON files exported from Studio are supported</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Maximum file size: 10MB</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              <span>Imported projects will be added to your dashboard</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Import;
