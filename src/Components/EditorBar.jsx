import { useState } from "react";
import { FaCopy, FaTrash, FaSave } from "react-icons/fa";
import { FaLeftLong } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ConfirmDialog from "../Base/ConfirmDialog.jsx";
import LoadingSpinner from "./LoadingSpinner.jsx";
import {
  saveProject,
  modificationAdded,
  discardModifications,
} from "../Redux/Slices/projectSlice.js";

function EditorBar({ project, onProjectUpdate }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedNode = useSelector((state) => state.node);
  const selectedEdge = useSelector((state) => state.edge);
  const { currentProject, modified } = useSelector((state) => state.project);
  console.log(selectedNode);
  console.log(selectedEdge);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [duplicateDialogOpen, setDuplicateDialogOpen] = useState(false);
  const [discardDialogOpen, setDiscardDialogOpen] = useState(false);
  const [projectTitle, setProjectTitle] = useState(project?.title || "");
  const [isSaving, setIsSaving] = useState(false);

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

  const saveChanges = async () => {
    setIsSaving(true);
    await dispatch(
      saveProject({ projectId: project.id, currentProject, projectTitle })
    ).unwrap();
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay
    setIsSaving(false);
  };

  const handleTitleChange = (e) => {
    setProjectTitle(e.target.value);
    dispatch(modificationAdded());
  };
  const handleReturnToDashboard = () => {
    if (modified) {
      setDiscardDialogOpen(true);
    } else {
      navigate("/dashboard");
    }
  };

  const handleDiscardChanges = () => {
    setDiscardDialogOpen(false);
    dispatch(discardModifications());
    navigate("/dashboard");
  };

  return (
    <>
      {/* Loading Spinner Overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/30 z-[60] flex items-center justify-center">
          <LoadingSpinner message="Saving Project..." size="Large" />
        </div>
      )}

      <nav className="fixed top-3 left-1/2 -translate-x-1/2 w-auto max-w-[90vw] h-14 bg-white rounded-xl z-40 shadow-xl border border-gray-200">
        <div className="w-full h-full flex items-center gap-3 px-4">
          {/* Back Button */}
          <button
            onClick={handleReturnToDashboard}
            className="h-9 px-4 bg-gradient-to-br from-[#5664F5] to-[#4451d9] text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 font-semibold text-sm"
          >
            <FaLeftLong className="text-xs" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="h-8 w-px bg-gray-300"></div>

          {/* Project Title Input */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <input
              type="text"
              value={projectTitle || ""}
              onChange={handleTitleChange}
              placeholder="Project Title"
              className="h-9 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#5664F5] focus:border-transparent transition-all duration-200 w-full max-w-xs"
            />
          </div>

          <div className="h-8 w-px bg-gray-300"></div>

          {/* Node Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDuplicateDialogOpen(true)}
              disabled={!selectedNode.nodeId}
              className={`h-9 w-9 rounded-lg transition-all duration-300 flex items-center justify-center ${
                selectedNode.nodeId
                  ? "bg-blue-50 text-[#5664F5] hover:bg-[#5664F5] hover:text-white hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
              title="Duplicate Node"
            >
              <FaCopy className="text-sm" />
            </button>

            <button
              onClick={() => setDeleteDialogOpen(true)}
              disabled={!selectedNode?.nodeId && !selectedEdge?.edgeId}
              className={`h-9 w-9 rounded-lg transition-all duration-300 flex items-center justify-center ${
                selectedNode?.nodeId || selectedEdge?.edgeId
                  ? "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                  : "bg-gray-100 text-gray-300 cursor-not-allowed"
              }`}
              title="Delete Selected"
            >
              <FaTrash className="text-sm" />
            </button>
          </div>

          <div className="h-8 w-px bg-gray-300"></div>

          {/* Save Button */}
          <button
            onClick={saveChanges}
            disabled={isSaving || !modified}
            className="h-9 px-3 bg-green-500 text-white rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            <FaSave />
            <span>{isSaving ? "Saving..." : "Save"}</span>
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

      <ConfirmDialog
        isOpen={discardDialogOpen}
        onClose={() => setDiscardDialogOpen(false)}
        onConfirm={handleDiscardChanges}
        title="Discard Changes"
        message="Discard Unsaved Changes ?"
        confirmText="Discard"
        cancelText="Cancel"
        type="warning"
      />
    </>
  );
}
export default EditorBar;
