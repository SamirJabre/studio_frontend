import { useNavigate } from "react-router";

function ProjectNotFound() {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center space-y-6 p-8">
        {/* 404 Icon */}
        <div className="flex justify-center mb-4">
          <svg
            className="w-24 h-24 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* 404 Text */}
        <h1 className="text-8xl font-bold text-blue-500 mb-2">404</h1>

        {/* Error Message */}
        <h2 className="text-4xl font-bold text-white mb-2">
          Project Not Found
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          The project you're looking for doesn't exist or has been deleted
        </p>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default ProjectNotFound;
