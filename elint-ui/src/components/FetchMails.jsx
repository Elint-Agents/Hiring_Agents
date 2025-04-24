// ✅ FetchMails.jsx
import React, { useState } from "react";
import axios from "axios";

export default function FetchMails() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    if (!username || !password) {
      setError("❌ Please enter both email and password.");
      return;
    }
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await axios.post("http://127.0.0.1:8000/mail_download", {
        username,
        password,
      });
      setResult(res.data.result);
    } catch (err) {
      setError("❌ Failed to fetch emails. Check credentials or server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="block mb-2 text-sm">Email (IMAP)</label>
      <input
        type="email"
        className="w-full p-2 border rounded mb-4"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="example@domain.com"
      />

      <label className="block mb-2 text-sm">Password</label>
      <input
        type="password"
        className="w-full p-2 border rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
      />

      <button
        onClick={handleFetch}
        disabled={loading}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        {loading ? "Fetching..." : "Fetch Resumes from Mail"}
      </button>

      {error && <p className="mt-4 text-red-600 text-sm">{error}</p>}

      {result && (
        <div className="mt-4 text-sm">
          ✅ <b>{result.attachments_downloaded}</b> attachments downloaded from <b>{result.unread_emails_found}</b> unread emails.
        </div>
      )}
    </div>
  );
}
