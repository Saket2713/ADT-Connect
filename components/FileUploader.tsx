
'use client';
import React, { useState } from 'react';
import storage from '@/lib/AppwriteClient';

interface FileUploaderProps {
  onUploadSuccess: () => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setLoading(true);
    setError(null);

    try {
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          alert('File is too large. Max size is 5MB.');
          continue;
        }

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
          alert('Only JPG and PNG files are allowed');
          continue;
        }

        await storage.createFile(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
          file.name,
          file
        );
      }
      console.log('Files uploaded successfully');
      onUploadSuccess();
    } catch (error) {
      setError('Failed to upload files. Please try again.');
      console.error('File upload error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-uploader-container flex flex-col items-center space-y-4 mt-6">
      <input
        type="file"
        onChange={handleFileUpload}
        disabled={loading}
        multiple
        className="file-input bg-gray-800 text-white p-2 rounded w-full max-w-md text-sm md:text-base"
        placeholder="Upload files"
      />
      {loading && <p className="text-blue-500 text-sm md:text-base">Uploading...</p>}
      {error && <p className="text-red-500 text-sm md:text-base">{error}</p>}
    </div>
  );
};

export default FileUploader;
