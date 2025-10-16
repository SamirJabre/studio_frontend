import { FaCube } from "react-icons/fa";
import { Position, Handle } from "@xyflow/react";

function EmailNode({ selected }) {
  return (
    <div
      className={`flex items-center gap-3 p-3 bg-white border-2 rounded-lg cursor-grab active:cursor-grabbing hover:border-[#5664F5] hover:shadow-md transition-all duration-200 group ${
        selected ? "border-[#5664F5] shadow-md" : "border-gray-200"
      }`}
    >
      <div
        className="p-2 rounded-lg text-white transition-transform group-hover:scale-110 duration-200"
        style={{ backgroundColor: "#F59E0B" }}
      >
        <FaCube />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#5664F5] transition-colors">
          Email
        </h4>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

export default EmailNode;
