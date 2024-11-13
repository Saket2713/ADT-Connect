
'use client';
import React from 'react';
import storage from '@/lib/AppwriteClient';

interface FileItemProps {
  file: { $id: string; name: string; mimeType: string };
  onDelete: (fileId: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({ file, onDelete }) => {
  const handlePreviewFile = () => {
    try {
      const url = storage.getFileView(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, file.$id);
      const mimeType = file.mimeType;

      if (mimeType.startsWith('image/')) {
        window.open(url, '_blank');
      } else if (mimeType === 'application/pdf') {
        const googleDocsUrl = `https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(url)}`;
        window.open(googleDocsUrl, '_blank');
      } else if (mimeType.startsWith('video/') || mimeType.startsWith('audio/')) {
        window.open(url, '_blank');
      } else if (['application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                  'application/msword', 'application/vnd.ms-powerpoint',
                  'application/vnd.ms-excel'].includes(mimeType)) {
        const officeViewerUrl = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(url)}`;
        window.open(officeViewerUrl, '_blank');
      } else if (['text/plain', 'application/json', 'application/javascript', 'text/html',
                  'application/xml', 'text/csv', 'text/markdown'].includes(mimeType) ||
                 mimeType.startsWith('text/')) {
        window.open(url, '_blank');
      } else {
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error previewing file:', error);
      alert('Failed to preview file. Please try again.');
    }
  };

  const handleDownloadFile = () => {
    try {
      const url = storage.getFileDownload(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, file.$id);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = file.name;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Failed to download file. Please try again.');
    }
  };

  const handleDeleteFile = async () => {
    try {
      await storage.deleteFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!, file.$id);
      onDelete(file.$id);
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Failed to delete file. Please try again.');
    }
  };

  return (
    <div className="p-6 rounded-xl bg-white bg-opacity-30 backdrop-blur-lg border border-white border-opacity-20 shadow-lg">
      <div className="flex justify-between items-center">
        <p>{file.name}</p>
        <button
          onClick={handleDeleteFile}
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
