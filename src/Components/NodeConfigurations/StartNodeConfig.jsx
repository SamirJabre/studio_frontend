function StartNodeConfig() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Node Label
        </label>
        <input
          type="text"
          placeholder="Enter start node label"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Description
        </label>
        <textarea
          rows={3}
          placeholder="Describe the workflow entry point"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none transition-all resize-none"
        />
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-700">
          <strong>Tip:</strong> This node marks the beginning of your workflow.
          It will be triggered automatically when the workflow starts.
        </p>
      </div>
    </div>
  );
}

export default StartNodeConfig;
