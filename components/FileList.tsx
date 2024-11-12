'use client'
import React from "react";
import FileItem from "./FileItem";

interface FileListProps {
  files: { $id: string; name: string; mimeType: string }[]; // Remove size here
  onDeleteSuccess: () => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDeleteSuccess }) => {
  return (
    <div className="mt-4">
  <h2 className="text-2xl font-semibold mb-4 text-white">Uploaded Files</h2>
  {files.length === 0 ? (
    <p className="text-gray-600">No files uploaded yet.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {files.map((file) => (
        <FileItem key={file.$id} file={file} onDelete={onDeleteSuccess} />
      ))}
    </div>
  )}
</div>



  );
};

export default FileList;
