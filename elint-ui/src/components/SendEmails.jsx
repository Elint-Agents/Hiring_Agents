// ✅ SendEmails.jsx
import React, { useState } from "react";
import axios from "axios";

export default function SendEmails() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`http://127.0.0.1:8000/send-intern-mails?preview=${preview}`);
      setMessage(`✅ ${res.data.result.sent} emails sent. Failed: ${res.data.result.failed}`);
    } catch (err) {
      setMessage("❌ Failed to send emails. Please check server logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={preview}
          onChange={() => setPreview(!preview)}
        />
        Preview Mode (don’t send emails, just simulate)
      </label>

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Sending..." : "Send Emails"}
      </button>

      {message && <p className="mt-4 text-sm font-medium">{message}</p>}
    </div>
  );
}
