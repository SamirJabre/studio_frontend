import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "@xyflow/react";
import { useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateProject } from "../Redux/Slices/projectSlice";

function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  selected,
  data,
  label,
  source,
  target,
}) {
  const dispatch = useDispatch();
  const project = useSelector((state) => state?.project?.currentProject);
  const nodes = project?.nodes || [];
  const edges = project?.edges || [];

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [labelValue, setLabelValue] = useState(data?.label || label || "");

  const edgeLabel = data?.label || label || labelValue;

  const handleAddLabel = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setIsHovered(false);
  };

  const handleSaveLabel = () => {
    if (!labelValue.trim()) {
      setIsEditing(false);
      setLabelValue(data?.label || label || "");
      return;
    }

    setIsEditing(false);

    const updatedEdges = edges.map((edge) => {
      if (edge.id === id) {
        return {
          ...edge,
          data: {
            ...edge.data,
            label: labelValue,
          },
        };
      }
      return edge;
    });

    dispatch(
      updateProject({
        updatedProject: {
          ...project,
          nodes,
          edges: updatedEdges,
        },
      })
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveLabel();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setLabelValue(data?.label || label || "");
    }
  };

  const handleMouseEnter = () => {
    if (!isEditing) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isEditing) {
      setIsHovered(false);
    }
  };

  return (
    <>
      {/* Main edge path */}
      <BaseEdge
        path={edgePath}
        style={{
          ...style,
          stroke: selected ? "#1976d2" : isHovered ? "#64748b" : "#9ca3af",
          strokeWidth: selected ? 2.5 : isHovered ? 2.5 : 2,
          transition: "stroke 0.2s ease, stroke-width 0.2s ease",
        }}
      />

      {/* Invisible wider path for better hover detection */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "pointer" }}
      />

      {/* Edge label and controls */}
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
          onMouseEnter={() => {
            if (!isEditing) setIsHovered(true);
          }}
          onMouseLeave={() => {
            if (!isEditing) setIsHovered(false);
          }}
        >
          {isEditing ? (
            // Edit mode
            <input
              type="text"
              value={labelValue}
              onChange={(e) => setLabelValue(e.target.value)}
              onBlur={handleSaveLabel}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder="Enter label"
              className="px-3 py-1.5 text-xs font-medium rounded-lg shadow-lg border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
              style={{ minWidth: "100px" }}
            />
          ) : edgeLabel ? (
            // Display label with edit icon on hover
            <div
              className={`group flex items-center gap-1.5 px-3 py-1.5 bg-white text-xs font-semibold rounded-lg shadow-md border-2 transition-all cursor-pointer ${
                selected
                  ? "border-blue-500 text-blue-700"
                  : "border-gray-300 text-gray-700 hover:border-blue-400"
              }`}
              onClick={handleAddLabel}
              title="Click to edit"
            >
              <span>{edgeLabel}</span>
              <FaEdit className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
            </div>
          ) : (
            // Show plus icon on hover
            isHovered && (
              <button
                onClick={handleAddLabel}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transition-all transform hover:scale-105"
                title="Add label"
              >
                <FaPlus className="text-[10px]" />
                <span>Add Label</span>
              </button>
            )
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

export default CustomEdge;
