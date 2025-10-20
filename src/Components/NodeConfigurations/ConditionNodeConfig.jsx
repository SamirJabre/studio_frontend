import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function ConditionNodeConfig() {
  const [conditionName, setConditionName] = useState("Condition");
  const [logic, setLogic] = useState("AND");
  const [conditions, setConditions] = useState([
    { id: 1, field: "", operator: "equals", value: "" },
  ]);

  const addCondition = () => {
    const newCondition = {
      id: Date.now(),
      field: "",
      operator: "equals",
      value: "",
    };
    setConditions([...conditions, newCondition]);
  };

  const removeCondition = (id) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter((c) => c.id !== id));
    }
  };

  const updateCondition = (id, field, value) => {
    setConditions(
      conditions.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Condition Name
        </label>
        <input
          type="text"
          value={conditionName}
          onChange={(e) => setConditionName(e.target.value)}
          placeholder="e.g., Check if user is verified"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] outline-none transition-all"
        />
      </div>

      {conditions.length > 1 && (
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Logic Operator
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setLogic("AND")}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                logic === "AND"
                  ? "bg-[#06B6D4] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              AND
            </button>
            <button
              type="button"
              onClick={() => setLogic("OR")}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                logic === "OR"
                  ? "bg-[#06B6D4] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              OR
            </button>
          </div>
          <p className="text-xs text-gray-500">
            {logic === "AND"
              ? "All conditions must be true"
              : "At least one condition must be true"}
          </p>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-700">
            Conditions
          </label>
          <span className="text-xs text-gray-500">
            {conditions.length} condition{conditions.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="space-y-3">
          {conditions.map((condition, index) => (
            <div
              key={condition.id}
              className="relative bg-gray-50 border-2 border-gray-200 rounded-lg p-4 space-y-3"
            >
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#06B6D4] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                {index + 1}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Field
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g., user.age"
                  value={condition.field}
                  onChange={(e) =>
                    updateCondition(condition.id, "field", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Operator
                </label>
                <select
                  required
                  value={condition.operator}
                  onChange={(e) =>
                    updateCondition(condition.id, "operator", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] outline-none transition-all text-sm"
                >
                  <option value="equals">Equals (==)</option>
                  <option value="not_equals">Not Equals (!=)</option>
                  <option value="greater_than">Greater Than (&gt;)</option>
                  <option value="less_than">Less Than (&lt;)</option>
                  <option value="greater_or_equal">
                    Greater or Equal (&gt;=)
                  </option>
                  <option value="less_or_equal">Less or Equal (&lt;=)</option>
                  <option value="contains">Contains</option>
                  <option value="not_contains">Does Not Contain</option>
                  <option value="starts_with">Starts With</option>
                  <option value="ends_with">Ends With</option>
                  <option value="exists">Exists</option>
                  <option value="not_exists">Does Not Exist</option>
                  <option value="is_empty">Is Empty</option>
                  <option value="is_not_empty">Is Not Empty</option>
                </select>
              </div>

              {!["exists", "not_exists", "is_empty", "is_not_empty"].includes(
                condition.operator
              ) && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Value
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Expected value"
                    value={condition.value}
                    onChange={(e) =>
                      updateCondition(condition.id, "value", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4] outline-none transition-all text-sm"
                  />
                </div>
              )}

              {index < conditions.length - 1 && (
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#06B6D4] text-white text-xs font-bold rounded-full shadow-md z-10">
                  {logic}
                </div>
              )}

              {conditions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCondition(condition.id)}
                  className="w-full flex justify-center items-center gap-x-3 px-3 py-2 bg-white hover:bg-red-500 border border-red-500 rounded-lg transition-all duration-300 text-red-500 hover:text-white"
                >
                  Delete
                  <FaTrash className="text-xs scale-125" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={addCondition}
        className="w-full px-4 py-3 border-2 border-dashed border-[#06B6D4] text-[#06B6D4] rounded-lg hover:bg-cyan-50 transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-sm"
      >
        <FaPlus className="text-xs" />
        Add Condition
      </button>
    </div>
  );
}

export default ConditionNodeConfig;
