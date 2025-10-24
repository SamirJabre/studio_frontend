import React from "react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "@xyflow/react";

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
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeLabel = data?.label || label;

  return (
    <>
      {/* Main edge path */}
      <BaseEdge
        path={edgePath}
        style={{
          ...style,
          stroke: selected ? "#1976d2" : "#9ca3af",
          strokeWidth: selected ? 2.5 : 2,
          transition: "stroke 0.2s ease, stroke-width 0.2s ease",
        }}
      />

      {/* Edge label */}
      {edgeLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <div
              className={`px-2 py-1 bg-white text-xs font-medium rounded shadow-md border transition-all ${
                selected
                  ? "border-blue-500 text-blue-700"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              {edgeLabel}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export default CustomEdge;
