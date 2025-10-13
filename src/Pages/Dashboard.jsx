import { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import DashboardBox from "../Components/DashboardBox.jsx";

function Dashboard() {
  const [search, setSearch] = useState("");

  const handleSearch = (query) => {
    setSearch(query);
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center bg-gray-100 p-5 gap-y-5">
      <Navbar handleSearch={handleSearch} />
      <DashboardBox search={search} />
    </div>
  );
}

export default Dashboard;
