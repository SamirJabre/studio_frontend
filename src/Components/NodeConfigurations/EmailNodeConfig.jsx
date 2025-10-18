function EmailNodeConfig() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Recipient Email
        </label>
        <input
          type="email"
          placeholder="recipient@example.com"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Subject Line
        </label>
        <input
          type="text"
          placeholder="Email subject"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Email Template
        </label>
        <textarea
          rows={4}
          placeholder="Enter your email content here..."
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all resize-none"
        />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <p className="text-xs text-amber-700">
          <strong>Note:</strong> You can use dynamic variables like {"{"}name
          {"}"}, {"{"}email{"}"} in your template.
        </p>
      </div>
    </div>
  );
}

export default EmailNodeConfig;
