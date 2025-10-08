import { useNavigate } from "react-router";

function AccessDenied() {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center space-y-6 p-8">
        {/* Lock Icon */}
        <div className="flex justify-center mb-4">
          <svg
            className="w-24 h-24 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-5xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-xl text-gray-300 mb-8">
          You don't have permission to access this project
        </p>

        {/* Back to Dashboard Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default AccessDenied;
