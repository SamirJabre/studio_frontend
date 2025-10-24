import { useState } from "react";
import { FaCopy, FaTrash } from "react-icons/fa";
import { FaLeftLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ConfirmDialog from "../Base/ConfirmDialog.jsx";

function EditorBar({ project, onProjectUpdate }) {
  const navigate = useNavigate();

  const selectedNode = useSelector((state) => state.node);
  const selectedEdge = useSelector((state) => state.edge);
  console.log(selectedNode);
  console.log(selectedEdge);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);

  const handleDuplicate = async () => {
    try {
      if (selectedNode?.nodeId) {
        const originalNode = project.nodes.find(
          (node) => node.id === selectedNode.nodeId
        );

        if (!originalNode) return;

        // Create a completely new node with a unique ID and offset position
        const newNodeId = `node-${Date.now()}`;
        const duplicatedNode = {
          ...originalNode,
          id: newNodeId,
          position: {
            x: originalNode.position.x + 50,
            y: originalNode.position.y + 50,
          },
          // Deep copy the data to avoid reference issues
          data: JSON.parse(JSON.stringify(originalNode.data)),
        };

        const updatedProject = {
          ...project,
          nodes: [...project.nodes, duplicatedNode],
          metadata: {
            ...project.metadata,
            lastModified: new Date().toISOString(),
          },
        };

        await onProjectUpdate(updatedProject);
        return;
      }
      return;
    } catch (e) {
      console.log(e);
      return;
    }
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
        await onProjectUpdate(updatedProject);
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
        await onProjectUpdate(updatedProject);
        return;
      }

      return;
    } catch (e) {
      console.log(e);
      return;
    }
  };

  return (
    <>
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
            onClick={() => setDuplicateDialogOpen(true)}
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
            onClick={() => setDeleteDialogOpen(true)}
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

      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteSelected}
        title="Delete"
        message={`Do you want to delete?`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      <ConfirmDialog
        isOpen={duplicateDialogOpen}
        onClose={() => setDuplicateDialogOpen(false)}
        onConfirm={handleDuplicate}
        title="Duplicate"
        message={`Do you want to duplicate?`}
        confirmText="Duplicate"
        cancelText="Cancel"
        type="info"
      />
    </>
  );
}

export default EditorBar;
