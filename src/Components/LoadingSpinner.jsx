import { FaSpinner } from "react-icons/fa";

function LoadingSpinner({
  message = "Loading...",
  subtext = "Please wait a moment",
  size = "large",
}) {
  const sizeClasses = {
    small: "text-3xl",
    medium: "text-4xl",
    large: "text-5xl",
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <FaSpinner
        className={`${sizeClasses[size]} text-[#5664F5] animate-spin mb-4`}
      />
      <h3 className="text-lg font-medium text-gray-700 mb-2">{message}</h3>
      {subtext && <p className="text-sm text-gray-500">{subtext}</p>}
    </div>
  );
}

export default LoadingSpinner;
