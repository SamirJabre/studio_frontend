import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router";

// Guest-only guard: lets login/register show their success toast, then redirects.
const RequireGuest = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    // Give login/register success toast time to show (matches toast 1500ms)
    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 1600);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate, token]);

  return <Outlet />;
};

export default RequireGuest;
