import { useState } from "react";
import { FaFolder, FaInfoCircle, FaFileImport, FaBars } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setActivetab } from "../Redux/Slices/tabSlice";

function Sidebar() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const dispatch = useDispatch();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <MdDashboard className="text-xl" />,
      description: "View all projects",
    },
    {
      id: "import",
      label: "Import Project",
      icon: <FaFileImport className="text-xl" />,
      description: "Import existing project",
    },
    {
      id: "about",
      label: "About",
      icon: <FaInfoCircle className="text-xl" />,
      description: "Learn more about Studio",
    },
  ];

  return (
    <div
      className={`h-full bg-white shadow-lg rounded-xl transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      {/* Header */}
      <div
        className={`p-4 border-b border-gray-200 flex items-center ${
          isCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <FaFolder className="text-[#5664F5] text-2xl" />
            <h2 className="text-xl font-bold text-gray-800">Studio</h2>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          <FaBars className="text-gray-600" />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-3 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              dispatch(setActivetab(item.id));
            }}
            className={`w-full h-16 flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? "bg-[#5664F5] text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            } ${isCollapsed ? "justify-center" : ""}`}
            title={isCollapsed ? item.label : ""}
          >
            <span
              className={
                activeTab === item.id ? "text-white" : "text-[#5664F5]"
              }
            >
              {item.icon}
            </span>
            {!isCollapsed && (
              <div className="flex-1 text-left overflow-hidden">
                <p className="font-semibold text-sm whitespace-nowrap">
                  {item.label}
                </p>
                <p
                  className={`text-xs whitespace-nowrap ${
                    activeTab === item.id ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-[#5664F5] to-[#4451d9] rounded-lg p-4 text-white">
            <h3 className="font-bold text-sm mb-1">AI Workflow Studio</h3>
            <p className="text-xs opacity-90">
              Build powerful automated workflows with visual node-based editor
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
