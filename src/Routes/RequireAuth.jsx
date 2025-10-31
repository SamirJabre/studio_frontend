import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

// Protects nested routes: renders children when authenticated, otherwise redirects to login.
const RequireAuth = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");

  if (!isAuthenticated || !token) {
    // Preserve the path the user tried to visit so we can send them back after login
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
