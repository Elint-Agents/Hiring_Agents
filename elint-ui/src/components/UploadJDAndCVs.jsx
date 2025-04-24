// ✅ UploadJDAndCVs.jsx
import React, { useState } from "react";
import axios from "axios";

export default function UploadJDAndCVs() {
  const [jdFile, setJdFile] = useState(null);
  const [cvFiles, setCvFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!jdFile || cvFiles.length === 0) {
      setMessage("❌ Please select both JD and at least one CV file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("jd_file", jdFile);
    for (let file of cvFiles) {
      formData.append("cv_files", file);
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/process-batch", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(`✅ ${res.data.message}`);
    } catch (err) {
      setMessage("❌ Error uploading files. Check server or file types.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">Upload JD (PDF)</label>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setJdFile(e.target.files[0])}
        className="mb-4"
      />

      <label className="block mb-2 text-sm font-medium text-gray-700">Upload CVs (PDF)</label>
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={(e) => setCvFiles(Array.from(e.target.files))}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Uploading..." : "Upload & Process"}
      </button>

      {message && <p className="mt-4 text-sm font-medium">{message}</p>}
    </div>
  );
}
