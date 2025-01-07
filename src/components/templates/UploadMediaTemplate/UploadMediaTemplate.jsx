// src/components/templates/UploadMediaTemplate/UploadMediaTemplate.jsx
import React from 'react';
import { Box } from '@mui/material';
import Header from '../../organisms/Header/Header';
import MediaUpload from '../../organisms/MediaUpload/MediaUpload';
import NotificationPanel from '../../organisms/NotificationPanelOrganism/NotificationPanelOrganism';

const UploadMediaTemplate = ({ files, onUpload, uploadProgress, notifications }) => {
  return (
    <Box>
      <Header />
      <Box padding={2}>
        <MediaUpload files={files} onUpload={onUpload} uploadProgress={uploadProgress} />
        <NotificationPanel notifications={notifications} />
      </Box>
    </Box>
  );
};

export default UploadMediaTemplate;
