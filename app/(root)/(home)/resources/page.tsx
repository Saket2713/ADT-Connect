'use client'
import React, { useState, useEffect } from "react";
import FileUploader from "@/components/FileUploader"; 
import FileList from "@/components/FileList"; 
import storage from "@/lib/AppwriteClient"; // Assuming Appwrite client is set up correctly

// Define a type for the file object returned by Appwrite
interface FileType {
  $id: string;
  name: string;
  mimeType: string;
}

const Resource: React.FC = () => {
  const [filesList, setFilesList] = useState<FileType[]>([]); // Use FileType here instead of any[]

  // Fetch files on initial load
  useEffect(() => {
    fetchFiles();
  }, []);

  // Fetch the updated list of files
  const fetchFiles = async () => {
    try {
      const response = await storage.listFiles(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!);

      // Map Appwrite File[] to the FileType[] format without the 'size' property
      const files: FileType[] = response.files.map((file) => ({
        $id: file.$id,
        name: file.name,
        mimeType: file.mimeType,
      }));
      
      setFilesList(files); // Store the files in state
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  // Handle upload success by fetching the updated list of files
  const handleUploadSuccess = () => {
    fetchFiles(); // Fetch updated files after upload
  };

  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Upload a File</h2>
      <FileUploader onUploadSuccess={handleUploadSuccess} /> {/* Pass handleUploadSuccess for dynamic update */}
      <FileList files={filesList} onDeleteSuccess={fetchFiles} /> {/* Pass filesList to FileList */}
    </div>
  );
};

export default Resource;
