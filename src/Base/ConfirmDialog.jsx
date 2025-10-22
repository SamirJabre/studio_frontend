import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "danger", // 'danger' or 'warning'
}) {
  if (!isOpen) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "danger":
        return {
          iconBg: "bg-red-100",
          iconColor: "text-red-600",
          buttonBg: "bg-red-600 hover:bg-red-700",
          buttonText: "text-white",
        };
      case "warning":
        return {
          iconBg: "bg-yellow-100",
          iconColor: "text-yellow-600",
          buttonBg: "bg-yellow-600 hover:bg-yellow-700",
          buttonText: "text-white",
        };
      default:
        return {
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
          buttonBg: "bg-blue-600 hover:bg-blue-700",
          buttonText: "text-white",
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
      ></div>

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-md w-full pointer-events-auto transform transition-all duration-300 animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 pb-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close dialog"
            >
              <FaTimes className="text-gray-400 hover:text-gray-600" />
            </button>

            {/* Icon */}
            <div
              className={`w-14 h-14 ${styles.iconBg} rounded-full flex items-center justify-center mb-4`}
            >
              <FaExclamationTriangle
                className={`text-2xl ${styles.iconColor}`}
              />
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

            {/* Message */}
            <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 p-6 pt-2 border-t border-gray-100">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-2.5 ${styles.buttonBg} ${styles.buttonText} font-semibold rounded-lg transition-all duration-200 hover:shadow-lg`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: scale(0.9);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          .animate-scaleIn {
            animation: scaleIn 0.3s ease-out;
          }
        `}
      </style>
    </>
  );
}

export default ConfirmDialog;
