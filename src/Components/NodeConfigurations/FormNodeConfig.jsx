function FormNodeConfig() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Form Title
        </label>
        <input
          type="text"
          placeholder="Enter form title"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5664F5] focus:border-[#5664F5] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Form Fields
        </label>
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Click to add form fields</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span className="text-sm text-gray-700">
            Required field validation
          </span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span className="text-sm text-gray-700">Show progress indicator</span>
        </label>
      </div>
    </div>
  );
}

export default FormNodeConfig;
