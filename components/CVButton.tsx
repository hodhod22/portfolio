"use client";

import { useState } from "react";
import { FiDownload, FiCheck } from "react-icons/fi";

export default function CVButton() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch("/api/download-cv");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Cecilia_Wiklund_CV.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all hover:scale-105"
    >
      {downloaded ? (
        <>
          <FiCheck className="w-5 h-5" />
          Nedladdad!
        </>
      ) : (
        <>
          <FiDownload className="w-5 h-5" />
          Ladda ner CV
        </>
      )}
    </button>
  );
}
