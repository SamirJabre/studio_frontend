import { useState, forwardRef, useImperativeHandle, useEffect } from "react";

const EmailNodeConfig = forwardRef(({ data }, ref) => {
  const [label, setLabel] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [subjectLine, setSubjectLine] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // Initialize state from data prop
  useEffect(() => {
    if (data) {
      if (data.label) setLabel(data.label);
      if (data.recipientEmail) setRecipientEmail(data.recipientEmail);
      if (data.subjectLine) setSubjectLine(data.subjectLine);
      if (data.emailBody) setEmailBody(data.emailBody);
    }
  }, [data]);

  // Expose getData method via ref
  useImperativeHandle(ref, () => ({
    getData: () => ({
      label,
      recipientEmail,
      subjectLine,
      emailBody,
    }),
  }));

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Email Title
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Enter Email Title"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all"
        />
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Recipient Email
        </label>
        <input
          required
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          placeholder="recipient@example.com"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Subject Line
        </label>
        <input
          required
          type="text"
          value={subjectLine}
          onChange={(e) => setSubjectLine(e.target.value)}
          placeholder="Email subject"
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Email Body
        </label>
        <textarea
          required
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
          rows={4}
          placeholder="Enter your email content here..."
          className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] outline-none transition-all resize-none"
        />
      </div>
    </div>
  );
});

export default EmailNodeConfig;
