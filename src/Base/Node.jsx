import { Position, Handle } from "@xyflow/react";
import {
  FaPlayCircle,
  FaStopCircle,
  FaWpforms,
  FaEnvelope,
  FaCloud,
  FaCodeBranch,
  FaCog,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setNodeType } from "../Redux/Slices/nodeSlice";

// Node configuration mapping
const NODE_CONFIGS = {
  startNode: {
    icon: FaPlayCircle,
    label: "Start",
    color: "#10B981",
    gradientFrom: "#10B981",
    gradientTo: "#059669",
    handles: { target: false, source: true },
  },
  endNode: {
    icon: FaStopCircle,
    label: "End",
    color: "#EF4444",
    gradientFrom: "#EF4444",
    gradientTo: "#DC2626",
    handles: { target: true, source: false },
  },
  formNode: {
    icon: FaWpforms,
    label: "Form",
    color: "#5664F5",
    gradientFrom: "#5664F5",
    gradientTo: "#4451d9",
    handles: { target: true, source: true },
  },
  emailNode: {
    icon: FaEnvelope,
    label: "Email",
    color: "#F59E0B",
    gradientFrom: "#F59E0B",
    gradientTo: "#D97706",
    handles: { target: true, source: true },
  },
  apiNode: {
    icon: FaCloud,
    label: "API",
    color: "#8B5CF6",
    gradientFrom: "#8B5CF6",
    gradientTo: "#7C3AED",
    handles: { target: true, source: true },
  },
  conditionNode: {
    icon: FaCodeBranch,
    label: "Condition",
    color: "#06B6D4",
    gradientFrom: "#06B6D4",
    gradientTo: "#0891B2",
    handles: { target: true, source: true },
  },
};

function Node({ selected, type, id, data }) {
  const dispatch = useDispatch();

  const config = NODE_CONFIGS[type];

  const Icon = config.icon;

  return (
    <div
      className={`relative flex items-center gap-3 p-3 bg-white border-2 rounded-lg cursor-grab active:cursor-grabbing hover:border-[#5664F5] hover:shadow-md transition-all duration-200 group ${
        selected ? "border-[#5664F5] shadow-md" : "border-gray-200"
      }`}
    >
      {/* Node Icon */}
      <div
        className="p-2 rounded-lg text-white transition-transform group-hover:scale-110 duration-200"
        style={{ backgroundColor: config.color }}
      >
        <Icon />
      </div>

      {/* Node Label */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#5664F5] transition-colors">
          {data.label}
        </h4>
      </div>

      {/* Configure Button */}
      {selected && type !== "startNode" && type !== "endNode" && (
        <button
          className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl ${
            selected
              ? "opacity-100 scale-100"
              : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
          }`}
          style={{
            background: `linear-gradient(135deg, ${config.gradientFrom} 0%, ${config.gradientTo} 100%)`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setNodeType(type));
          }}
        >
          <FaCog className="text-xs animate-spin-slow" />
        </button>
      )}

      {/* Connection Handles */}
      {config.handles.target && (
        <Handle type="target" position={Position.Left} />
      )}
      {config.handles.source && (
        <Handle type="source" position={Position.Right} />
      )}

      {/* Animations - Using global style tag */}
      <style>
        {`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        button:hover .animate-spin-slow {
          animation: spin-slow 1s linear infinite;
        }
      `}
      </style>
    </div>
  );
}

export default Node;
