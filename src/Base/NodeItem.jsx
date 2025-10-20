function NodeItem({ icon, title, description, color }) {
  const onDragStart = (event) => {
    const nodeType = `${title.toLowerCase()}Node`;
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="flex items-center gap-3 p-3 bg-white border-2 border-gray-200 rounded-lg cursor-grab active:cursor-grabbing hover:border-[#5664F5] hover:shadow-md transition-all duration-200 group"
    >
      <div
        className="p-2 rounded-lg text-white transition-transform group-hover:scale-110 duration-200"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#5664F5] transition-colors">
          {title}
        </h4>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
    </div>
  );
}

export default NodeItem;
