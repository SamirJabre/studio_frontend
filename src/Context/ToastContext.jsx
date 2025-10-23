import { createContext, useContext, useState, useCallback } from "react";
import Toast from "../Base/Toast";

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback(
    (message, type = "success", duration = 3000) => {
      setToast({ message, type, duration });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const showSuccess = useCallback(
    (message, duration = 3000) => {
      showToast(message, "success", duration);
    },
    [showToast]
  );

  const showError = useCallback(
    (message, duration = 4000) => {
      showToast(message, "error", duration);
    },
    [showToast]
  );

  return (
    <ToastContext.Provider
      value={{ showToast, hideToast, showSuccess, showError }}
    >
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
          duration={toast.duration}
        />
      )}
    </ToastContext.Provider>
  );
};
