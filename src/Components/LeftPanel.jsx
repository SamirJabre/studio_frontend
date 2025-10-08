import { useSelector, useDispatch } from "react-redux";
import { toggleLeftPanel } from "../Redux/Slices/leftPanelSlice.js";
import { FaBars, FaTimes, FaCube, FaLayerGroup } from "react-icons/fa";
import NodeItem from "../Base/NodeItem.jsx";

function LeftPanel() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.leftPanel.isOpen);

  const handleToggle = () => {
    dispatch(toggleLeftPanel());
  };

  return (
    <>
      {/* Toggle Button - Always Visible */}
      <button
        onClick={handleToggle}
        className={`fixed top-4 z-50 bg-white shadow-lg rounded-r-lg p-3 hover:bg-[#5664F5] hover:text-white transition-all duration-500 group ${
          isOpen ? "left-72" : "left-0"
        }`}
        aria-label={isOpen ? "Close panel" : "Open panel"}
      >
        {isOpen ? (
          <FaTimes className="text-lg transition-transform group-hover:rotate-90 duration-500" />
        ) : (
          <FaBars className="text-lg transition-transform group-hover:scale-110 duration-500" />
        )}
      </button>

      {/* Overlay - Visible when panel is open on smaller screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={handleToggle}
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-40 flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Panel Header */}
        <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-[#5664F5] to-[#4451d9]">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <FaLayerGroup className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Components</h2>
              <p className="text-xs text-white/80 mt-0.5">
                Drag and drop nodes
              </p>
            </div>
          </div>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Node Categories */}
          <div className="space-y-4">
            {/* Basic Nodes Section */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">
                Basic Nodes
              </h3>
              <div className="space-y-2">
                <NodeItem
                  icon={<FaCube />}
                  title="Start Node"
                  description="Entry point"
                  color="#10B981"
                />
                <NodeItem
                  icon={<FaCube />}
                  title="Process Node"
                  description="Process data"
                  color="#5664F5"
                />
                <NodeItem
                  icon={<FaCube />}
                  title="Decision Node"
                  description="Conditional logic"
                  color="#F59E0B"
                />
                <NodeItem
                  icon={<FaCube />}
                  title="End Node"
                  description="Exit point"
                  color="#EF4444"
                />
              </div>
            </div>

            {/* Advanced Nodes Section */}
            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-2">
                Advanced Nodes
              </h3>
              <div className="space-y-2">
                <NodeItem
                  icon={<FaCube />}
                  title="API Call"
                  description="External request"
                  color="#8B5CF6"
                />
                <NodeItem
                  icon={<FaCube />}
                  title="Database"
                  description="Data storage"
                  color="#06B6D4"
                />
                <NodeItem
                  icon={<FaCube />}
                  title="Transform"
                  description="Data manipulation"
                  color="#EC4899"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Panel Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Drag nodes onto the canvas to start building
          </p>
        </div>
      </div>
    </>
  );
}

export default LeftPanel;
