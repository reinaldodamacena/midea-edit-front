// src/components/molecules/EditorPanel/EditorPanel.jsx
import React from 'react';
import { Box } from '@mui/material';
import TextField from '../../atoms/TextField/TextField';
import Button from '../../atoms/Button/Button';

const EditorPanel = ({ transcription, onSave, onChange }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Transcrição"
        multiline
        rows={6}
        value={transcription}
        onChange={onChange}
        fullWidth
        sx={{
          backgroundColor: 'background.paper',
          borderRadius: 2,
        }}
      />
      <Button onClick={onSave} variant="contained">
        Salvar Alterações
      </Button>
    </Box>
  );
};

export default EditorPanel;
