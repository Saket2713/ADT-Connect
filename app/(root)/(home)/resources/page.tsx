"use client"
import React, { useState, useEffect } from "react";
import { Client, ID, Storage } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("672eea12003a27727408");

const storage = new Storage(client);

const AppwriteFileHandler: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [filesList, setFilesList] = useState<{ $id: string; name: string; mimeType: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleUploadFile = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      await storage.createFile("672eeb38002d9aa86f17", ID.unique(), file);
      setFile(null);
      fetchFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload file.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await storage.listFiles("672eeb38002d9aa86f17");
      setFilesList(response.files);
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Failed to fetch files.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewFile = async (fileId: string, mimeType: string) => {
    try {
      const url = storage.getFileView("672eeb38002d9aa86f17", fileId);

      if (mimeType === "application/pdf") {
        // Preview PDF directly
        window.open(url, "_blank");
      } else if (
        mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // .docx
        mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || // .xlsx
        mimeType === "application/vnd.openxmlformats-officedocument.presentationml.presentation" // .pptx
      ) {
        // Use Google Docs Viewer for Office files (2nd format)
        const googleDocsUrl = `https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(url)}`;
        window.open(googleDocsUrl, "_blank");
      } else {
        // Fallback for other types - open in a new tab
        window.open(url, "_blank");
      }
    } catch (error) {
      console.error("Error opening file preview:", error);
      setError("Failed to open file preview.");
    }
  };

  const handleDownloadFile = (fileId: string) => {
    try {
      const url = storage.getFileDownload("672eeb38002d9aa86f17", fileId);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = ""; // Trigger download
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (error) {
      console.error("Error downloading file:", error);
      setError("Failed to download file.");
    }
  };

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Upload a File</h2>
      <input
        placeholder="Upload file"
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

      <h2 className="text-2xl font-semibold mt-8 mb-4">Uploaded Files</h2>
      {filesList.length > 0 ? (
        filesList.map((file) => (
          <div
            key={file.$id}
            className="mb-4 p-4 rounded bg-white bg-opacity-30 backdrop-blur-lg border border-gray-600"
          >
            <p>{file.name}</p>
            <button
              onClick={() => handlePreviewFile(file.$id, file.mimeType)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Preview
            </button>
            <button
              onClick={() => handleDownloadFile(file.$id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Download
            </button>
          </div>
        ))
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
};

export default AppwriteFileHandler;