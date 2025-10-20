import { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const FormNodeConfig = forwardRef(({ data }, ref) => {
  const [label, setLabel] = useState("Form");
  const [fields, setFields] = useState([
    { id: 1, label: "", type: "text", required: false },
  ]);

  // Initialize state from data prop
  useEffect(() => {
    if (data) {
      if (data.label) setLabel(data.label);
      if (data.fields && data.fields.length > 0) setFields(data.fields);
    }
  }, [data]);

  // Expose getData method via ref
  useImperativeHandle(ref, () => ({
    getData: () => ({
      label,
      fields,
    }),
  }));

  const addField = () => {
    const newField = {
      id: Date.now(),
      label: "",
      type: "text",
      required: false,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    if (fields.length > 1) {
      setFields(fields.filter((f) => f.id !== id));
    }
  };

  const updateField = (id, property, value) => {
    setFields(
      fields.map((f) => (f.id === id ? { ...f, [property]: value } : f))
    );
  };

  const fieldTypes = [
    { value: "text", label: "Text" },
    { value: "email", label: "Email" },
    { value: "password", label: "Password" },
    { value: "number", label: "Number" },
    { value: "tel", label: "Phone" },
    { value: "url", label: "URL" },
    { value: "date", label: "Date" },
    { value: "time", label: "Time" },
    { value: "textarea", label: "Text Area" },
    { value: "select", label: "Dropdown" },
    { value: "checkbox", label: "Checkbox" },
    { value: "radio", label: "Radio" },
    { value: "file", label: "File Upload" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Form Title
        </label>
        <input
          required
          type="text"
          placeholder="Enter Form Title"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5664F5] focus:border-[#5664F5] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-gray-700">
            Form Fields
          </label>
          <span className="text-xs text-gray-500">
            {fields.length} field{fields.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative bg-gray-50 border-2 border-gray-200 rounded-lg p-4 space-y-3 hover:border-[#5664F5] transition-all"
            >
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#5664F5] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                {index + 1}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Field Label *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., Full Name"
                    value={field.label}
                    onChange={(e) =>
                      updateField(field.id, "label", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5664F5] focus:border-[#5664F5] outline-none transition-all text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">
                      Field Type
                    </label>
                    <select
                      value={field.type}
                      onChange={(e) =>
                        updateField(field.id, "type", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5664F5] focus:border-[#5664F5] outline-none transition-all text-sm"
                    >
                      {fieldTypes.map((type, index) => (
                        <option key={index || type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1 ">
                      Required
                    </label>
                    <div className="flex items-center h-[42px] ">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={field.required}
                          onChange={(e) =>
                            updateField(field.id, "required", e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5664F5]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5664F5]"></div>
                        <span className="ms-3 text-sm font-medium text-gray-700">
                          {field.required ? "Yes" : "No"}
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-2">
                  <div className="text-xs text-gray-500 mb-1">Preview:</div>
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">
                      {field.label || "Field Label"}
                    </span>
                    {field.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                    <span className="text-gray-400 ml-2">({field.type})</span>
                  </div>
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField(field.id)}
                    className="w-full flex justify-center items-center gap-x-3 px-3 py-2 bg-white hover:bg-red-500 border border-red-500 rounded-lg transition-all duration-300 text-red-500 hover:text-white"
                  >
                    Delete
                    <FaTrash className="text-xs scale-125" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={addField}
        className="w-full px-4 py-3 border-2 border-dashed border-[#5664F5] text-[#5664F5] rounded-lg hover:bg-indigo-50 transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-sm"
      >
        <FaPlus className="text-xs" />
        Add Field
      </button>
    </div>
  );
});

export default FormNodeConfig;
