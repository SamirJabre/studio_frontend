import Navbar from "../Components/Navbar.jsx";
import DashboardBox from "../Components/DashboardBox.jsx";

function Dashboard() {
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center bg-gray-100 p-5 gap-y-5">
      <Navbar />
      <DashboardBox />
    </div>
  );
}

export default Dashboard;
