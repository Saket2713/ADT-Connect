// Resource.tsx
'use client'
import React from "react";
import FileUploader from "@/components/FileUploader"; 
import FileList from "@/components/FileList"; 

const Resource: React.FC = () => {
  return (
    <div className="text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Upload a File</h2>
      <FileUploader onUploadSuccess={() => window.location.reload()} />
      <FileList />
    </div>
  );
};

export default Resource;
