// src/App.jsx
import React from "react";
import UploadJDAndCVs from "./components/UploadJDAndCVs";
import SendEmails from "./components/SendEmails";
import FetchMails from "./components/FetchMails";

export default function App() {
  const [tab, setTab] = React.useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Elint Data Resume Portal
      </h1>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-6 gap-4">
          <button
            onClick={() => setTab(0)}
            className={`px-4 py-2 rounded ${
              tab === 0 ? "bg-blue-700 text-white" : "bg-white border"
            }`}
          >
            Upload JD & CVs
          </button>
          <button
            onClick={() => setTab(1)}
            className={`px-4 py-2 rounded ${
              tab === 1 ? "bg-blue-700 text-white" : "bg-white border"
            }`}
          >
            Send Emails
          </button>
          <button
            onClick={() => setTab(2)}
            className={`px-4 py-2 rounded ${
              tab === 2 ? "bg-blue-700 text-white" : "bg-white border"
            }`}
          >
            Fetch Resumes
          </button>
        </div>

        <div className="bg-white p-6 rounded shadow">
          {tab === 0 && <UploadJDAndCVs />}
          {tab === 1 && <SendEmails />}
          {tab === 2 && <FetchMails />}
        </div>
      </div>
    </div>
  );
}
