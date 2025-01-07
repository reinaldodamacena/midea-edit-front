// src/components/organisms/EditorPanelOrganism/EditorPanelOrganism.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import EditorPanel from '../../molecules/EditorPanel/EditorPanel';

const EditorPanelOrganism = ({ transcription, onSave, onChange }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Editor de Corte
      </Typography>
      <EditorPanel transcription={transcription} onSave={onSave} onChange={onChange} />
    </Box>
  );
};

export default EditorPanelOrganism;
