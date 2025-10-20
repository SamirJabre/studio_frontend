import { FaCopy, FaTrash } from "react-icons/fa";
import { FaLeftLong } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { deleteEdge, deleteNode } from "../APIS/editorApi.js";

function EditorBar({ project, projectId, onProjectUpdate }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedNode = useSelector((state) => state.node);
  const selectedEdge = useSelector((state) => state.edge);
  console.log(selectedNode);
  console.log(selectedEdge);


  const handleDuplicate = () => {
    if (!selectedNode.nodeId) return;
    console.log("Duplicate clicked");
  };

  const handleDeleteSelected = async () => {
    try {
      if (selectedEdge?.edgeId) {
        const updatedProject = {
          ...project,
          edges: project.edges.filter(
            (edge) => edge.id !== selectedEdge.edgeId
          ),
        };
        deleteEdge(projectId, updatedProject, dispatch);

        if (onProjectUpdate) onProjectUpdate(updatedProject);
        return;
      }

      if (selectedNode?.nodeId) {
        const updatedProject = {
          ...project,
          nodes: project.nodes.filter(
            (node) => node.id !== selectedNode.nodeId
          ),
          edges: project.edges.filter(
            (edge) =>
              edge.source !== selectedNode.nodeId &&
              edge.target !== selectedNode.nodeId
          ),
        };
        deleteNode(projectId, updatedProject, dispatch);

        if (onProjectUpdate) onProjectUpdate(updatedProject);
        return;
      }

      return;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  return (
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 w-auto h-12 bg-white rounded-lg z-40 shadow-lg border border-gray-200">
      <div className="w-full h-full flex items-center gap-2 px-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="h-8 px-3 bg-[#5664F5] text-white rounded-md hover:bg-[#4451d9] transition-all duration-300 flex items-center gap-2 font-medium text-sm"
        >
          <FaLeftLong className="text-xs" />
          <span>Back to Dashboard</span>
        </button>

        <div className="h-6 w-px bg-gray-300"></div>

        <button
          onClick={handleDuplicate}
          disabled={!selectedNode.nodeId}
          className={`h-8 w-8 rounded-md transition-all duration-300 flex items-center justify-center border-2 ${
            selectedNode.nodeId
              ? "border-[#5664F5] text-[#5664F5] hover:bg-[#5664F5] hover:text-white cursor-pointer"
              : "border-gray-300 text-gray-300 cursor-not-allowed"
          }`}
          title="Duplicate Node"
        >
          <FaCopy className="text-sm" />
        </button>

        <button
          onClick={handleDeleteSelected}
          disabled={!selectedNode?.nodeId && !selectedEdge?.edgeId}
          className={`h-8 w-8 rounded-md transition-all duration-300 flex items-center justify-center border-2 ${
            selectedNode?.nodeId || selectedEdge?.edgeId
              ? "border-[#5664F5] text-[#5664F5] hover:bg-[#5664F5] hover:text-white cursor-pointer"
              : "border-gray-300 text-gray-300 cursor-not-allowed"
          }`}
          title="Delete Selected"
        >
          <FaTrash className="text-sm" />
        </button>
      </div>
    </nav>
  );
}

export default EditorBar;
