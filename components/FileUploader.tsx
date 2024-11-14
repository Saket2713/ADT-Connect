
'use client'
import React, { useState } from "react";
import { ID } from "appwrite";
import storage from "@/lib/AppwriteClient";

interface FileUploaderProps {
  onUploadSuccess: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUploadFile = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, ID.unique(), file);
      setFile(null);
      onUploadSuccess();
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        placeholder="file"
        type="file"
        className="p-2 text-white mb-4 bg-gray-700 rounded"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <button
        onClick={handleUploadFile}
        disabled={loading}
        className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500"
      >
        {loading ? "Uploading..." : "Upload File"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default FileUploader;