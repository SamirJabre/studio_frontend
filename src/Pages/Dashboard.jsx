import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../Redux/Slices/authSlice";
import Navbar from "../Components/Navbar.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated2 = JSON.parse(localStorage.getItem("isAuthenticated"));
  console.log(isAuthenticated, isAuthenticated2);

  useEffect(() => {
    if (!isAuthenticated || !isAuthenticated2) {
      navigate("/login");
    }
  }, [isAuthenticated, isAuthenticated2, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center bg-gray-100">
      <Navbar logout={handleLogout} />
    </div>
  );
}

export default Dashboard;
