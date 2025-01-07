// src/components/organisms/MediaUpload/MediaUpload.jsx
import React from 'react';
import { Box } from '@mui/material';
import Card from '../../molecules/Card/Card';
import ProgressBar from '../../atoms/ProgressBar/ProgressBar';
import Button from '../../atoms/Button/Button';

const MediaUpload = ({ files, onUpload, uploadProgress }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {files.map((file, index) => (
        <Card
          key={index}
          title={file.name}
          description={`Tamanho: ${file.size} MB`}
          actionLabel="Enviar"
          onAction={() => onUpload(file)}
        />
      ))}
      {uploadProgress !== null && <ProgressBar value={uploadProgress} />}
    </Box>
  );
};

export default MediaUpload;
