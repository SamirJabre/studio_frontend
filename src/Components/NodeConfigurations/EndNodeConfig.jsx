function EndNodeConfig() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Completion Message
        </label>
        <input
          type="text"
          placeholder="Workflow completed successfully"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Final Actions
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-gray-700">
              Send completion notification
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-gray-700">Log workflow results</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-gray-700">
              Cleanup temporary data
            </span>
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Success Redirect URL (Optional)
        </label>
        <input
          type="url"
          placeholder="https://example.com/success"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EF4444] focus:border-[#EF4444] outline-none transition-all"
        />
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
        <p className="text-xs text-red-700">
          <strong>Note:</strong> This node marks the end of your workflow. No
          further actions will execute after this point.
        </p>
      </div>
    </div>
  );
}

export default EndNodeConfig;
