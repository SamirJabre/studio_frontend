import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Navbar from "../Components/Navbar.jsx";
import DashboardBox from "../Components/DashboardBox.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated2 = JSON.parse(localStorage.getItem("isAuthenticated"));

  const [search, setSearch] = useState("");

  const handleSearch = (query) => {
    setSearch(query);
  };

  useEffect(() => {
    if (!isAuthenticated || !isAuthenticated2) {
      navigate("/login");
    }
  }, [isAuthenticated, isAuthenticated2, navigate]);

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center bg-gray-100 p-5 gap-y-5">
      <Navbar handleSearch={handleSearch} />
      <DashboardBox search={search} />
    </div>
  );
}

export default Dashboard;
