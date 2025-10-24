import Navbar from "../Components/Navbar.jsx";
import DashboardBox from "../Components/DashboardBox.jsx";
import About from "../Components/About.jsx";
import Import from "../Components/Import.jsx";
import Sidebar from "../Components/Sidebar.jsx";
import { useSelector } from "react-redux";

function Dashboard() {
  const activeTab = useSelector((state) => state.tab.activeTab);

  const activeComponent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardBox />;
      case "import":
        return <Import />;
      case "about":
        return <About />;
      default:
        return <DashboardBox />;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center bg-gray-100 p-5 gap-y-5">
      <Navbar />
      <div className="w-full flex-1 flex gap-5 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">{activeComponent()}</div>
      </div>
    </div>
  );
}

export default Dashboard;
