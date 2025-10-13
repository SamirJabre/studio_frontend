import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router";

// Guest-only guard: lets login/register show their success toast, then redirects.
const RequireGuest = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Give login/register success toast time to show (matches toast 1500ms)
    const timer = setTimeout(() => {
      navigate("/dashboard", { replace: true, state: { from: location } });
    }, 1600);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate, location]);

  return <Outlet />;
};

export default RequireGuest;
