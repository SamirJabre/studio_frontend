import { useState, forwardRef, useImperativeHandle, useEffect } from "react";

const ApiNodeConfig = forwardRef(({ data }, ref) => {
  const [label, setLabel] = useState("");
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [method, setMethod] = useState("GET");
  const [requestHeaders, setRequestHeaders] = useState("");
  const [requestBody, setRequestBody] = useState("");

  // Initialize state from data prop
  useEffect(() => {
    if (data) {
      if (data.label) setLabel(data.label);
      if (data.apiEndpoint) setApiEndpoint(data.apiEndpoint);
      if (data.method) setMethod(data.method);
      if (data.requestHeaders) setRequestHeaders(data.requestHeaders);
      if (data.requestBody) setRequestBody(data.requestBody);
    }
  }, [data]);

  // Expose getData method via ref
  useImperativeHandle(ref, () => ({
    getData: () => ({
      label,
      apiEndpoint,
      method,
      requestHeaders,
      requestBody,
    }),
  }));
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          API Name
        </label>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          type="text"
          placeholder="Enter API Name"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          API Endpoint
        </label>
        <input
          required
          value={apiEndpoint}
          onChange={(e) => setApiEndpoint(e.target.value)}
          type="url"
          placeholder="https://api.example.com/endpoint"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Method
        </label>
        <select
          value={method}
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] outline-none transition-all"
          onChange={(e) => setMethod(e.target.value)}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>PATCH</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Request Headers (JSON)
        </label>
        <textarea
          value={requestHeaders}
          onChange={(e) => setRequestHeaders(e.target.value)}
          rows={3}
          placeholder='{"Content-Type": "application/json"}'
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] outline-none transition-all resize-none font-mono text-xs"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Request Body (JSON)
        </label>
        <textarea
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
          rows={3}
          placeholder='{"key": "value"}'
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#8B5CF6] focus:border-[#8B5CF6] outline-none transition-all resize-none font-mono text-xs"
        />
      </div>
    </div>
  );
});

export default ApiNodeConfig;
