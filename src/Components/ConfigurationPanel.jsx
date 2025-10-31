import { useSelector, useDispatch } from "react-redux";
import { setNodeType } from "../Redux/Slices/nodeSlice.js";
import { useRef } from "react";
import {
  FaTimes,
  FaWpforms,
  FaEnvelope,
  FaCloud,
  FaCodeBranch,
  FaCog,
} from "react-icons/fa";
// import { updateNodeData } from "../APIS/projectsApi.js";

// Import individual node configuration components
import FormNodeConfig from "./NodeConfigurations/FormNodeConfig.jsx";
import EmailNodeConfig from "./NodeConfigurations/EmailNodeConfig.jsx";
import ApiNodeConfig from "./NodeConfigurations/ApiNodeConfig.jsx";
import ConditionNodeConfig from "./NodeConfigurations/ConditionNodeConfig.jsx";

function ConfigurationPanel({ project, onProjectUpdate }) {
  const dispatch = useDispatch();
  const selectedNodeType = useSelector((state) => state.node.nodeType);
  const selectedNodeId = useSelector((state) => state.node.nodeId);
  const isOpen = Boolean(selectedNodeType);
  const configRef = useRef(null);

  const closePanel = () => {
    dispatch(setNodeType(null));
    // dispatch(setNodeId(null));
  };

  const getCurrentNode = () => {
    if (!project || !project.nodes || !selectedNodeId) return null;
    return project.nodes.find((node) => node.id === selectedNodeId);
  };

  const currentNode = getCurrentNode();

  // Handle save configuration
  const handleSave = async () => {
    if (!configRef.current || !currentNode) return;
    try {
      // Get data from the config component
      const configData = configRef.current.getData();
      const updatedNodes = project.nodes.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              data: {
                ...currentNode.data,
                ...configData,
              },
            }
          : node
      );
      const updatedProject = {
        ...project,
        nodes: updatedNodes,
        metadata: {
          ...project.metadata,
          lastModified: new Date().toISOString(),
        },
      };
      onProjectUpdate(updatedProject);

      // Update node data via API
      // const result = await updateNodeData(project, projectId, selectedNodeId, {
      //   ...currentNode.data,
      //   ...configData,
      // });

      // if (result.success) {
      //   // Update local project state
      //   const updatedProject = {
      //     ...project,
      //     nodes: result.updatedNodes,
      //   };
      //   onProjectUpdate(updatedProject);

      //   // Show success feedback
      //   closePanel();
      // }

      closePanel();
    } catch (error) {
      console.error("Error saving configuration:", error);
    }
  };

  // Node configuration metadata
  const getNodeConfig = () => {
    switch (selectedNodeType) {
      // case "startNode":
      //   return {
      //     icon: <FaPlayCircle className="text-2xl" />,
      //     title: "Start Node",
      //     color: "#10B981",
      //     description: "Configure the entry point of your workflow",
      //   };
      case "formNode":
        return {
          icon: <FaWpforms className="text-2xl" />,
          title: "Form Node",
          color: "#5664F5",
          description: "Set up form fields and validation rules",
        };
      case "emailNode":
        return {
          icon: <FaEnvelope className="text-2xl" />,
          title: "Email Node",
          color: "#F59E0B",
          description: "Configure email notifications and templates",
        };
      case "apiNode":
        return {
          icon: <FaCloud className="text-2xl" />,
          title: "API Node",
          color: "#8B5CF6",
          description: "Set up external API requests",
        };
      case "conditionNode":
        return {
          icon: <FaCodeBranch className="text-2xl" />,
          title: "Condition Node",
          color: "#06B6D4",
          description: "Define conditional logic and branching",
        };
      // case "endNode":
      //   return {
      //     icon: <FaStopCircle className="text-2xl" />,
      //     title: "End Node",
      //     color: "#EF4444",
      //     description: "Configure workflow completion actions",
      //   };
      default:
        return {
          icon: <FaCog className="text-2xl" />,
          title: "Node Configuration",
          color: "#6B7280",
          description: "Configure your node",
        };
    }
  };

  const nodeConfig = getNodeConfig();

  const renderNodeConfiguration = () => {
    if (!currentNode) return null;

    switch (selectedNodeType) {
      // case "startNode":
      //   return <StartNodeConfig />;
      case "formNode":
        return <FormNodeConfig ref={configRef} data={currentNode.data} />;
      case "emailNode":
        return <EmailNodeConfig ref={configRef} data={currentNode.data} />;
      case "apiNode":
        return <ApiNodeConfig ref={configRef} data={currentNode.data} />;
      case "conditionNode":
        return <ConditionNodeConfig ref={configRef} data={currentNode.data} />;
      // case "endNode":
      //   return <EndNodeConfig />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="relative px-6 py-5 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${nodeConfig.color} 0%, ${nodeConfig.color}dd 100%)`,
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
          </div>

          <div className="relative">
            <div className="flex items-start justify-between mb-3">
              <div
                className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg"
                style={{ color: "white" }}
              >
                {nodeConfig.icon}
              </div>
              <button
                onClick={closePanel}
                className="p-2 text-white hover:bg-white/20 rounded-lg transition-all duration-200 hover:rotate-90"
                aria-label="Close panel"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              {nodeConfig.title}
            </h2>
            <p className="text-sm text-white/90">{nodeConfig.description}</p>
            {selectedNodeId && (
              <p className="text-xs text-white/70 mt-2 font-mono">
                ID: {selectedNodeId}
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: nodeConfig.color }}
                ></span>
                Node Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium text-gray-900">
                    {nodeConfig.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FaCog className="text-gray-500" />
                Configuration
              </h3>
              {renderNodeConfiguration()}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2.5 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `,
        }}
      />
    </>
  );
}

export default ConfigurationPanel;
