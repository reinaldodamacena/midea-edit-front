// src/pages/UploadMediaPage.jsx
import React, { useState } from 'react';
import UploadMediaTemplate from '../components/templates/UploadMediaTemplate/UploadMediaTemplate';

const UploadMediaPage = () => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);

  const handleUpload = (file) => {
    console.log('Uploading file:', file);
    setUploadProgress(50); // Mock progress
    setTimeout(() => setUploadProgress(100), 2000); // Simulate upload complete
  };

  return (
    <UploadMediaTemplate
      files={files}
      onUpload={handleUpload}
      uploadProgress={uploadProgress}
      notifications={[]}
    />
  );
};

export default UploadMediaPage;
