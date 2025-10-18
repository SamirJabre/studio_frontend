function ConditionNodeConfig() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Condition Name
        </label>
        <input
          type="text"
          placeholder="e.g., Check if user is verified"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Field to Check
        </label>
        <input
          type="text"
          placeholder="e.g., user.verified"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Operator
        </label>
        <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] outline-none transition-all">
          <option>equals</option>
          <option>not equals</option>
          <option>greater than</option>
          <option>less than</option>
          <option>contains</option>
          <option>exists</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Value to Compare
        </label>
        <input
          type="text"
          placeholder="Expected value"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] outline-none transition-all"
        />
      </div>

      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-3">
        <p className="text-xs text-cyan-700">
          <strong>Info:</strong> This node will split the workflow based on the
          condition result (true/false).
        </p>
      </div>
    </div>
  );
}

export default ConditionNodeConfig;
