// FileItem.tsx
'use client'
import React from "react";
import storage from "@/lib/AppwriteClient"; 

interface FileItemProps {
  file: { $id: string; name: string; mimeType: string };
  onDelete: (fileId: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onDelete }) => {
  const handlePreviewFile = () => {
    const url = storage.getFileView("672eeb38002d9aa86f17", file.$id);
    const googleDocsUrl = `https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(url)}`;
    window.open(
      file.mimeType.includes("pdf") ? url : googleDocsUrl,
      "_blank"
    );
  };

  const handleDownloadFile = () => {
    const url = storage.getFileDownload("672eeb38002d9aa86f17", file.$id);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = file.name;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  return (
    <div className="p-6 rounded-xl bg-white bg-opacity-30 backdrop-blur-lg border border-white border-opacity-20 shadow-lg">
      <div className="flex justify-between items-center">
        <p>{file.name}</p>
        <button
          onClick={() => onDelete(file.$id)}
          className="text-red-500 hover:text-red-700"
        >
          &#x1F5D1;
        </button>
      </div>
      <div className="mt-2">
        <button
          onClick={handlePreviewFile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Preview
        </button>
        <button
          onClick={handleDownloadFile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default FileItem;
