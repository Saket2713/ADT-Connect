// FileList.tsx
'use client'
import React, { useEffect, useState } from "react";
import storage from "@/lib/AppwriteClient"; 
import FileItem from "./FileItem";

interface File {
  $id: string;
  name: string;
  mimeType: string;
}

const FileList: React.FC = () => {
  const [filesList, setFilesList] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

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

  const handleDeleteFile = async (fileId: string) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      setLoading(true);
      setError(null);

      try {
        await storage.deleteFile("672eeb38002d9aa86f17", fileId);
        fetchFiles();
      } catch (error) {
        console.error("Error deleting file:", error);
        setError("Failed to delete file.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Uploaded Files</h2>
      {loading ? (
        <p>Loading files...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filesList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filesList.map((file) => (
            <FileItem key={file.$id} file={file} onDelete={handleDeleteFile} />
          ))}
        </div>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
};

export default FileList;
